import React, { useState, useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/Image';
import Countries from './countries'
import { getCookie } from '../../helper/util'
import i18n from '../../helper/i18n'


const Dropdown = () => {
  const [hidden, setHidden] = useState(true)
  const [temp, setTemp] = useState(false);

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

  const [selectedLang, setSelectedLang] = useState("Korean");

  useEffect(() => {
    let getLangLocal = localStorage.getItem("i18nextLng");
    let getLangCookie = getCookie("i18next");
    let getLangTag = document.documentElement.lang;

    if (
      getLangLocal === "en" ||
      getLangCookie === "en" ||
      getLangTag === "en"
    ) {
      changeLanguage("en", "English");
    } else {
      changeLanguage("ko", "Korean");
    }
  }, []);


  const changeLanguage = (lang, name) => {
    setSelectedLang(name);
    i18n.changeLanguage(lang);

    if (temp) {
      let currentPath = location.pathname + location.search;
      window.location.href = currentPath;
  }
  setTemp(true)
  };

  return (
    <div className="hidden lg:flex relative">
      <button
        ref={buttonRef}
        onClick={handleDropdownClick}
        className="flex items-center justify-center h-16 w-12">
        {/* <span className={`selectedLang === 'Korean' ? "text-base flag-icon flag-icon-kr" : "text-base flag-icon flag-icon-en"`}></span> */}
        <span className={selectedLang === 'Korean' ? "text-base flag-icon flag-icon-kr" : "text-base flag-icon flag-icon-us"}></span>
      </button>
      <div ref={dropdownRef}
        className={`dropdown absolute top-0 right-0 mt-16 ${hidden ? '' : 'open'}`}>
        <div className="dropdown-content w-64 bottom-start">
          <div className="header-lang  pos-rel f-right">
            <ul className="header-lang-list">
              <li><a onClick={() => {
                changeLanguage("en", "English");
              }}>English</a></li>
              <li><a onClick={() => {
                changeLanguage("ko", "Korean");
              }}>Korean</a></li>

            </ul>
          </div>
          {/* <Countries /> */}
          {/* {selectedLang} */}
        </div>
      </div>
    </div>
  )
}

export default Dropdown
