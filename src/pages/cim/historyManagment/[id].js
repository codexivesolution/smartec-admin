import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import SectionTitle from '../../../components/section-title';
import Widget from '../../../components/widget';
import { ApiGet, ApiPost, ApiPut } from '../../../helper/API/ApiData';

const EditHistory = () => {
    const router = useRouter();
    const { id } = router.query
    const [historyData, setHistoryData] = useState({
        id: "",
        year: "",
        month: "",
        content: ""
    })

    const handleChange = (e) => {
        setHistoryData({
            ...historyData,
            [e.target.name]: e.target.value
        })
    }

    const getHistoryByID = () => {
        ApiGet(`CompanyInformation/get-company-information-by-id/${id}`)
            .then((res) => {
                setHistoryData({
                    id: id,
                    year: res?.data?.year,
                    month: res?.data?.month,
                    content: res?.data?.content
                })
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const saveHistory = () => {
        const body = {
            year: historyData.year,
            month: historyData.month,
            content: historyData.content,
        }
        if (id === "0") {
            ApiPost("CompanyInformation/add-company-information" , body)
                .then((res) => {
                    router.push('/cim/historyManagment/list')
                })
        } else {
            ApiPut("CompanyInformation/edit-company-information/" + id, body)
                .then((res) => {
                    router.push('/cim/historyManagment/list')
                })
        }
    }

    useEffect(() => {
        if (id !== "0") {
            getHistoryByID()
        }
    }, [id])
    useEffect(() => {
        if (id !== "0") {
            getHistoryByID()
        }
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
                                name="year"
                                type="text"
                                className="form-input"
                                placeholder="연도를 입력하세요."
                                value={historyData.year}
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
                                value={historyData.month}
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
                            <textarea
                                name="content"
                                className="form-textarea"
                                rows="3"
                                placeholder="내용을 입력하세요."
                                value={historyData.content}
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
                        onClick={saveHistory}
                    >
                        {id ? "수정하기" : "작성하기"}
                    </button>
                </div>
            </div>
        </>
    )
}

export default EditHistory
