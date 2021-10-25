import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import SectionTitle from '../../../components/section-title';
import Widget from '../../../components/widget';

const DataScience = () => {
    const router = useRouter();
    const { id } = router.query
    const [userData, setUserData] = useState({
        id: "",
        name: "",
        studyMethod: "",
        studyDesign: "",
        exposureVariable: "",
        adjustmentVariable: "",
        outcomeVariable: "",
        followUpVariable: "",
        subgroupVariable: "",
        attachment: "",

    })

    const getUserByID = () => {
        ApiGet(`general/getFuneralNewsByID/${id}`)
            .then((res) => {
                setUserData({
                    id: id,
                    name: "",
                    studyMethod: "",
                    studyDesign: "",
                    exposureVariable: "",
                    adjustmentVariable: "",
                    outcomeVariable: "",
                    followUpVariable: "",
                    subgroupVariable: "",
                    attachment: "",
                })
            })
            .catch((error) => {
                console.log(error);
            });
    }

    useEffect(() => {
        debugger
        if (id > 0) {
            setUserData({
                name: "test",
                studyMethod: "test",
                studyDesign: "test",
                exposureVariable: "test",
                adjustmentVariable: "test",
                outcomeVariable: "test",
                followUpVariable: "test",
                subgroupVariable: "test",
                attachment: "test",
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
                        <table>
                            <tr>
                                <td>이름</td>
                                <td>{userData.name}</td>
                            </tr>
                            <tr>
                                <td>연구 유형</td>
                                <td>{userData.studyMethod}</td>
                            </tr>
                            <tr>
                                <td>연구 디자인</td>
                                <td>{userData.studyDesign}</td>
                            </tr>
                            <tr>
                                <td>노출 변수</td>
                                <td>{userData.exposureVariable}</td>
                            </tr>
                            <tr>
                                <td>보정 변수</td>
                                <td>{userData.adjustmentVariable}</td>
                            </tr>
                            <tr>
                                <td>결과 변수</td>
                                <td>{userData.outcomeVariable}</td>
                            </tr>
                            <tr>
                                <td>추적관찰 변수</td>
                                <td>{userData.followUpVariable}</td>
                            </tr>
                            <tr>
                                <td>하위그룹 변수</td>
                                <td>{userData.subgroupVariable}</td>
                            </tr>
                            <tr>
                                <td>첨부파일</td>
                                <td>{userData.attachment}</td>
                            </tr>
                        </table>
                    </div>
                </div>




            </Widget>

            <div className="flex flex-col lg:flex-row lg:flex-wrap justify-end">
                <div className="mb-4 ">
                    <button
                        type="button"
                        className="btn btn-default bg-blue-500 hover:bg-blue-600 text-white btn-rounded w-full pt-5 pb-4 text-xl font-bold"
                        onClick={() => { }}
                    >
                        다운로드
                    </button>
                </div>
            </div>
        </>
    )
}

export default DataScience
