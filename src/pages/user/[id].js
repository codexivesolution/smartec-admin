import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import SectionTitle from '../../components/section-title';
import Widget from '../../components/widget';
import { ApiGet, ApiPatch } from '../../helper/API/ApiData';
import countries from '../../json/countries.json'

const EditUser = () => {
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
    const countryData = React.useMemo(() => countries, [])

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

    const getUserByID = () => {
        ApiGet(`user/${id}`)
            .then((res) => {
                console.log("res res 0", res);
                setUserData({
                    id: id,
                    name: res.data.first_name + " " + res.data.last_name,
                    regDate: res.data.country,
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
        getUserByID()
    }, [])

    return (
        <>
            <SectionTitle title="기본 설정" subtitle="사용자 관리" />
            <Widget
                title="상세정보"
                description=""
            >
                <div className="flex flex-col lg:flex-row lg:flex-wrap w-full lg:space-x-4 mb-10">
                    <div className="w-full lg:w-1/4">
                        <div className={`form-element form-element-inline`}>
                            <div className="form-label">이름</div>
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
                            >수정
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row lg:flex-wrap w-full lg:space-x-4 mb-10">
                    <div className="w-full lg:w-1/4">
                        <div className={`form-element form-element-inline`}>
                            <div className="form-label">가입일</div>
                            <p> {userData.regDate} </p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row lg:flex-wrap w-full lg:space-x-4 mb-10">
                    <div className="w-full lg:w-1/4">
                        <div className={`form-element form-element-inline`}>
                            <div className="form-label">이메일</div>
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
                            <div className="form-label">소속</div>
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
                            >수정
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row lg:flex-wrap w-full lg:space-x-4 mb-10">
                    <div className="w-full lg:w-1/4">
                        <div className={`form-element form-element-inline`}>
                            <div className="form-label">국가</div>
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
                                        <option value={c.name}>{c.name}</option>
                                    </>
                                ))}
                            </select>
                            <button
                                type="button"
                                className="btn btn-default bg-blue-500 hover:bg-blue-600 text-white btn-rounded pt-5 pb-4 text-xl font-bold"
                                onClick={() => disableEnable("country")}
                            >수정
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
                        저장
                    </button>
                </div>
            </div>
        </>
    )
}

export default EditUser
