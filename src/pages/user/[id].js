import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import SectionTitle from '../../components/section-title';
import Widget from '../../components/widget';
import { ApiGet, ApiPatch } from '../../helper/API/ApiData';
import { useTranslation } from 'react-i18next';

const EditUser = () => {
    const { t } = useTranslation();
    const router = useRouter();
    const { id } = router.query
    const [userData, setUserData] = useState({
        id: "",
        name: "",
        regDate: "",
        email: "",
        organization: "",
        country: "",
    })
    const [nameDisabled, setNameDisabled] = useState(true)
    const [organizationDisabled, setOrganizationDisabled] = useState(true)
    const [countryDisabled, setCountryDisabled] = useState(true)
    const [countryData, setCountryData] = useState([])


    const handleChange = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        })
    }

    const disableEnable = (type) => {
        if (type === "name") {
            setNameDisabled(!nameDisabled)
        }
        if (type === "organization") {
            setOrganizationDisabled(!organizationDisabled)
        }
        if (type === "country") {
            setCountryDisabled(!countryDisabled)
        }
    }

    const getCountry = () => {
        ApiGet(`general/country`)
            .then((res) => {
                    console.log("country",res);
                    setCountryData(
                        res?.data &&
                        res?.data.map((d) => {
                            return {
                                value: d.id,
                                label: d.name
                            }
                        }) 
                    )
            })
            .catch((error) => {
                console.log(error);
            });
    }

    useEffect(() => {
        console.log("countryData",countryData);
    }, [countryData])

    const getUserByID = () => {
        ApiGet(`user/${id}`)
            .then((res) => {
                setUserData({
                    id: id,
                    name: res.data.first_name + " " + res.data.last_name,
                    regDate: res.data.registration_date,
                    email: res.data.email,
                    organization: res.data.organization,
                    country: res.data.country,
                })
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const saveUser = () => {
        const body = {
            last_name: userData.name,
            first_name: userData.name,
            email: userData.email,
            organization: userData.organization,
            country: userData.country
        }

        ApiPatch("admin/edituser/" + id, body)
            .then((res) => {
                router.push('/user/list');
            })
    }

    useEffect(() => {
        getCountry()
        if (id) {
            getUserByID()
        }
    }, [])

    return (
        <>
            <SectionTitle title={`${t("Basic_Setting.basic_setting")}`} subtitle={`${t("Basic_Setting.user_management")}`} />
            <Widget
                title={`${t("Basic_Setting.detail_information")}`}
                description=""
            >
                <div className="flex flex-col lg:flex-row lg:flex-wrap w-full lg:space-x-4 mb-10">
                    <div className="w-full lg:w-1/4">
                        <div className={`form-element form-element-inline`}>
                            <div className="form-label">{t("name")}</div>
                            <input
                                name="name"
                                type="text"
                                className="form-input"
                                placeholder="Enter something..."
                                value={userData.name}
                                autoComplete="off"
                                disabled={nameDisabled}
                                onChange={(e) => handleChange(e)}
                            />
                            <button
                                type="button"
                                className="btn btn-default bg-blue-500 hover:bg-blue-600 text-white btn-rounded pt-5 pb-4 text-xl font-bold"
                                onClick={() => disableEnable("name")}
                            >
                                {t("edit")}
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row lg:flex-wrap w-full lg:space-x-4 mb-10">
                    <div className="w-full lg:w-1/4">
                        <div className={`form-element form-element-inline`}>
                            <div className="form-label">{t("registration_date")}</div>
                            <p> {userData.regDate} </p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row lg:flex-wrap w-full lg:space-x-4 mb-10">
                    <div className="w-full lg:w-1/4">
                        <div className={`form-element form-element-inline`}>
                            <div className="form-label">{t("logIn.email")}</div>
                            <input
                                name="email"
                                type="text"
                                className="form-input"
                                placeholder="Enter something..."
                                value={userData.email}
                                autoComplete="off"
                                disabled={true}
                            />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row lg:flex-wrap w-full lg:space-x-4 mb-10">
                    <div className="w-full lg:w-1/4">
                        <div className={`form-element form-element-inline`}>
                            <div className="form-label">{t("organization")}</div>
                            <input
                                name="organization"
                                type="text"
                                className="form-input"
                                placeholder="Enter something..."
                                value={userData.organization}
                                autoComplete="off"
                                disabled={organizationDisabled}
                                onChange={(e) => handleChange(e)}
                            />
                            <button
                                type="button"
                                className="btn btn-default bg-blue-500 hover:bg-blue-600 text-white btn-rounded pt-5 pb-4 text-xl font-bold"
                                onClick={() => disableEnable("organization")}
                            >
                                {t("edit")}
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row lg:flex-wrap w-full lg:space-x-4 mb-10">
                    <div className="w-full lg:w-1/4">
                        <div className={`form-element form-element-inline`}>
                            <div className="form-label">{t("country")}</div>
                            <select
                                name="country"
                                value={userData.country}
                                placeholder="Select Country"
                                className="form-select"
                                disabled={countryDisabled}
                                onChange={(e) => handleChange(e)}
                            >
                                {countryData.map((c) => (
                                    <>
                                        <option value={c.value}>{c.label}</option>
                                    </>
                                ))}
                            </select>
                            <button
                                type="button"
                                className="btn btn-default bg-blue-500 hover:bg-blue-600 text-white btn-rounded pt-5 pb-4 text-xl font-bold"
                                onClick={() => disableEnable("country")}
                            >
                                {t("edit")}
                            </button>
                        </div>
                    </div>
                </div>

            </Widget>

            <div className="flex flex-col lg:flex-row lg:flex-wrap justify-end">
                <div className="mb-4 ">
                    <button
                        type="button"
                        className="btn btn-default bg-blue-500 hover:bg-blue-600 text-white btn-rounded w-full pt-5 pb-4 text-xl font-bold"
                        onClick={saveUser}
                    >
                        {t("save")}
                    </button>
                </div>
            </div>
        </>
    )
}

export default EditUser
