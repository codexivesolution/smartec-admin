import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import SectionTitle from '../../../components/section-title';
import Widget from '../../../components/widget';
import { useTranslation } from 'react-i18next';
import { ApiGet } from '../../../helper/API/ApiData';
import AuthStorage from '../../../helper/AuthStorage';
import { DataScienceSubType, DataScienceSubTypeEn, DataScienceSubTypeKo } from '../../../helper/Constant';

const DataScience = () => {
    const { t } = useTranslation();
    const router = useRouter();
    const { id } = router.query
    const [lang, setLang] = useState('')
    const [dataScienceData, setDataScienceData] = useState({
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
        attachmentName: "",
        data_science_detail: []
    })

    const [dataScienceSubType, setDataScienceSubType] = useState([])

    const subTypeArr = () => {
        let valueList = lang === 'ko' ? DataScienceSubTypeKo : DataScienceSubTypeEn
        setDataScienceSubType([
            { value: DataScienceSubType.StudyDesign, label: valueList.StudyDesign },
            { value: DataScienceSubType.AdjustmentVariable, label: valueList.AdjustmentVariable },
            { value: DataScienceSubType.ExposureVariable, label: valueList.ExposureVariable },
            { value: DataScienceSubType.FollowUpVariable, label: valueList.FollowUpVariable },
            { value: DataScienceSubType.GroupVariable, label: valueList.GroupVariable },
            { value: DataScienceSubType.OutcomeVariable, label: valueList.OutcomeVariable },
            { value: DataScienceSubType.SubgroupVariable, label: valueList.SubgroupVariable }
        ])
    }

    const setLabelTranslation = (type) => {
        return dataScienceSubType.find((data) => data.value === type).label
    }

    const getDataScienceByID = () => {
        ApiGet(`dataScience/get-data-science-by-id/${id}`)
            .then((res) => {
                let data_science_detail = res?.data?.data_science_detail && res?.data?.data_science_detail.map((da) => {
                    return {
                        label: setLabelTranslation(da?.sub_type),
                        value: da.content.map((d) => {
                            return d.first_content + "-" + d.second_content
                        }).join(',')
                    }
                })
                setDataScienceData({
                    id: id,
                    name: res?.data?.user,
                    studyMethod: res?.data?.type,
                    studyDesign: "",
                    exposureVariable: "",
                    adjustmentVariable: "",
                    outcomeVariable: "",
                    followUpVariable: "",
                    subgroupVariable: "",
                    attachment: res?.data?.file,
                    attachmentName: res?.data?.file.split('/')[res?.data?.file.split('/').length-1],
                    data_science_detail: data_science_detail
                })
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const downloadFile = (url) => {
        fetch(url)
            .then(response => response.blob())
            .then(blob => {
                const fileName = Math.floor(Math.random() * 10000000000);
                const link = document.createElement("a");
                link.href = URL.createObjectURL(blob);
                link.download = fileName;
                link.click();
            })
            .catch(console.error);
    }

    useEffect(() => {
        setLang(AuthStorage.getLang())
        subTypeArr()
        if (id !== "0" && id) {
            getDataScienceByID()
        }
    }, [id])

    useEffect(() => {
        setLang(AuthStorage.getLang())
        subTypeArr()
        if (id !== "0" && id) {
            getDataScienceByID()
        }
    }, [])


    // useEffect(() => {
    //     debugger
    //     if (id > 0) {
    //         setDataScienceData({
    //             name: "test",
    //             studyMethod: "test",
    //             studyDesign: "test",
    //             exposureVariable: "test",
    //             adjustmentVariable: "test",
    //             outcomeVariable: "test",
    //             followUpVariable: "test",
    //             subgroupVariable: "test",
    //             attachment: "test",
    //         })
    //     }
    // }, [id])
    return (
        <>
            <SectionTitle title={`${t("Data_Management.data_management")}`} subtitle={`${t("Data_Management.data_science")}`} />
            <Widget
                title={`${t("user_input_data")}`}
                description=""
            >
                <div className="flex flex-col lg:flex-row lg:flex-wrap w-full lg:space-x-4 mb-10">
                    <div className="w-full lg:w-1/4">
                        <table>
                            <tr>
                                <td>이름 :</td>
                                <td>{dataScienceData.name}</td>
                            </tr>
                            <tr>
                                <td>연구 유형 :</td>
                                <td>{dataScienceData.studyMethod}</td>
                            </tr>

                            {dataScienceData.data_science_detail.map((data) => (
                                <tr>
                                    <td>{data.label} :</td>
                                    <td>{data.value}</td>
                                </tr>
                            ))

                            }



                            {/* <tr>
                                <td>연구 디자인 :</td>
                                <td>{dataScienceData.studyDesign}</td>
                            </tr>
                            <tr>
                                <td>노출 변수 :</td>
                                <td>{dataScienceData.exposureVariable}</td>
                            </tr>
                            <tr>
                                <td>보정 변수 :</td>
                                <td>{dataScienceData.adjustmentVariable}</td>
                            </tr>
                            <tr>
                                <td>결과 변수 :</td>
                                <td>{dataScienceData.outcomeVariable}</td>
                            </tr>
                            <tr>
                                <td>추적관찰 변수 :</td>
                                <td>{dataScienceData.followUpVariable}</td>
                            </tr>
                            <tr>
                                <td>하위그룹 변수 :</td>
                                <td>{dataScienceData.subgroupVariable}</td>
                            </tr> */}
                            <tr>
                                <td>첨부파일 :</td>
                                <td>{dataScienceData.attachmentName} </td>
                                <td> <img src="../../../images/Vector.png" onClick={() => downloadFile(dataScienceData.attachment)} /></td>
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
                    // onClick={saveInevestmentData}
                    >
                        다운로드
                    </button>
                </div>
            </div>
        </>
    )
}

export default DataScience
