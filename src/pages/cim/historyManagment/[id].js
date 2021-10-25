import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import SectionTitle from '../../../components/section-title';
import Widget from '../../../components/widget';

const EditHistory = () => {
    const router = useRouter();
    const { id } = router.query
    const [userData, setUserData] = useState({
        id: "",
        year: "",
        month: "",
        content: ""

    })

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
        ApiGet(`general/getFuneralNewsByID/${id}`)
            .then((res) => {
                setUserData({
                    id: id,
                    year: "",
                    month: "",
                    content: ""
                })
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const saveUser = () => {
        router.push('/cim/historyManagment/list')
    }

    useEffect(() => {
        debugger
        if (id > 0) {
            setUserData({
                year: "2021",
                month: "10",
                content: "Test Content"
            })
        }
    }, [id])
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
                                name="year"
                                type="text"
                                className="form-input"
                                placeholder="연도를 입력하세요."
                                value={userData.year}
                                autoComplete="off"
                                onChange={(e) => handleChange(e)}
                            />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row lg:flex-wrap w-full lg:space-x-4 mb-10">
                    <div className="w-full lg:w-1/4">
                        <div className={`form-element form-element-inline`}>
                            <div className="form-label">이메일</div>
                            <input
                                name="month"
                                type="text"
                                className="form-input"
                                placeholder="월을 입력하세요."
                                value={userData.month}
                                autoComplete="off"
                                onChange={(e) => handleChange(e)}
                            />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row lg:flex-wrap w-full lg:space-x-4 mb-10">
                    <div className="w-full lg:w-1/4">
                        <div className={`form-element form-element-inline`}>
                            <div className="form-label">소속</div>
                            {/* <input
                                name="content"
                                type="text"
                                className="form-input"
                                placeholder="내용을 입력하세요."
                                value={userData.content}
                                autoComplete="off"
                                onChange={(e) => handleChange(e)}
                            /> */}
                            <textarea
                                // ref={item.ref}
                                name="content"
                                className="form-textarea"
                                rows="3"
                                placeholder="내용을 입력하세요."
                                value={userData.content}
                                autoComplete="off"
                                onChange={(e) => handleChange(e)}
                            >
                            </textarea>
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
                        {id ? "수정하기" : "작성하기"}
                    </button>
                </div>
            </div>
        </>
    )
}

export default EditHistory
