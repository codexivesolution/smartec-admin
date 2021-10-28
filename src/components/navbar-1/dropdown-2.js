import React, { useState, useEffect, useRef } from 'react'
import Countries from './countries'
import { getCookie } from '../../helper/util'
import i18next from 'i18next'


const Dropdown = () => {
  const [hidden, setHidden] = useState(true)

  const buttonRef = useRef(null)
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        hidden ||
        buttonRef.current.contains(event.target) ||
        dropdownRef.current.contains(event.target)
      ) {
        return false
      }
      setHidden(!hidden)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [hidden, dropdownRef, buttonRef])

  const handleDropdownClick = () => {
    setHidden(!hidden)
  }

  const [selectedLang, setSelectedLang] = useState("한국어(KR)");

  useEffect(() => {
    let getLangLocal = localStorage.getItem("i18nextLng");
    let getLangCookie = getCookie("i18next");
    let getLangTag = document.documentElement.lang;

    if (
      getLangLocal === "en" ||
      getLangCookie === "en" ||
      getLangTag === "en"
    ) {
      changeLanguage("en", "English(EN)");
    } else {
      changeLanguage("ko", "한국어(KR)");
    }
  }, []);


  const changeLanguage = (lang, name) => {
    console.log(("======================================================================"));
    setSelectedLang(name);
    i18next.changeLanguage(lang);
  };

  return (
    <div className="hidden lg:flex relative">
      <button
        ref={buttonRef}
        onClick={handleDropdownClick}
        className="flex items-center justify-center h-16 w-12">
        <span className={`text-base flag-icon flag-icon-us`}></span>
      </button>
      <div ref={dropdownRef}
        className={`dropdown absolute top-0 right-0 mt-16 ${hidden ? '' : 'open'}`}>
        <div className="dropdown-content w-64 bottom-start">
          <Countries />
          {selectedLang}
        </div>
      </div>
    </div>
  )
}

export default Dropdown
