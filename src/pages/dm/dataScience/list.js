import router from 'next/router'
import React, { useEffect, useState } from 'react'
import Datatable from '../../../components/datatable'
import SectionTitle from '../../../components/section-title'
import Widget from '../../../components/widget'
import { ApiGet, ApiPost } from '../../../helper/API/ApiData'
import { useTranslation } from 'react-i18next';
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable'
import { DataScienceSubType, DataScienceSubTypeEn, DataScienceSubTypeKo } from '../../../helper/Constant'
import AuthStorage from '../../../helper/AuthStorage'

const List = () => {
    const { t } = useTranslation();
    const columns = React.useMemo(
        () => [
            {
                Header: `${t("number")}`,
                accessor: 'number'
            },
            {
                Header: `${t("type")}`,
                accessor: 'type'
            },
            {
                Header: `${t("name")}`,
                accessor: 'name'
            },
            {
                Header: `${t("organization")}`,
                accessor: 'organization'
            },
            {
                Header: `${t("content")}`,
                accessor: 'id',
                Cell: (props) => <span onClick={() => createPdfFile(props.value)} ><img src="../../../images/Vector.png" /></span>
            },
            {
                Header: `${t("file_submitted")}`,
                accessor: 'file',
                // Cell: (props) => <span><a href={props.value} target="_blank" download><img src="../../../images/Vector.png" /></a></span>
                Cell: (props) => <span onClick={() => download(props.value)} ><img src="../../../images/Vector.png" /></span>
            },
            {
                Header: `${t("date_registered")}`,
                accessor: 'registrationDate'
            }
        ],
        []
    )
    const [searchKeyword, setSearchKeyword] = useState("")
    const [dataScinceList, setDataScinceList] = useState([])
    const [seletedDeleteIDs, setSeletedDeleteIDs] = useState("")
    const [lang, setLang] = useState('')

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
        let val = dataScienceSubType.find((data) => data.value === type)
        console.log(" val val val val val val", val);
        return val.label.toString()
    }


    const download = (url) => {
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

    const createPdfFile = (data) => {
        let doc = new jsPDF();

        ApiGet(`dataScience/get-data-science-by-id/${data}`)
            .then((res) => {
                let data_science_detail = res?.data?.data_science_detail && res?.data?.data_science_detail.map((da) => {
                    return {
                        // label: `${setLabelTranslation(da?.sub_type)}`,
                        label: da?.sub_type,
                        value: da.content.map((d) => {
                            return d.first_content + "-" + d.second_content
                        }).join(',')
                    }
                })

                doc.autoTable({
                    body: data_science_detail
                })
                doc.save("a4.pdf");
            })
            .catch((error) => {
                console.log(error);
            });

    }


    const handleChange = (e) => {
        // if (e.target.value !== "") {
        //     setBtnDisable(false)
        // } else {
        //     setBtnDisable(true)
        // }
        setSearchKeyword(e.target.value)
    }

    const createHistory = () => {
        router.push('/cim/dataScience/0')
    }

    const getRowVal = (rowData) => {
        // router.push('/dm/dataScience/'+rowData.id)
    }

    const getSelectedRowIds = (selectedRowIdsData) => {
        const ids = selectedRowIdsData.map((data) => data.id).join(',')
        setSeletedDeleteIDs(ids)
    }

    const deleteDataSciencedata = () => {
        ApiPost(`dataScience/delete-data-science-by-admin`, {
            id: seletedDeleteIDs
        })
            .then((res) => {
                getAllInvestmentData(50, 1)
            })
            .catch((error) => {
                console.log("error", error);
            });
    }


    const getAllDataScienceData = (per_page = 50, page_number = 1) => {
        ApiGet(`dataScience/get-data-science-by-admin?keyword=${searchKeyword}&per_page=${per_page}&page_number=${page_number}`)
            .then((res) => {
                setDataScinceList(res?.data?.dataScience &&
                    res?.data?.dataScience.map((d, index) => {
                        return {
                            id: d?.id,
                            number: index + 1,
                            type: d?.type,
                            file: d?.file,
                            organization: d?.organization,
                            registrationDate: d?.created_at,
                            name: d?.name,
                            data_science_detail: d?.data_science_detail,
                        }
                    }))
            })
            .catch((error) => {
            });
    }

    useEffect(() => {
        setLang(AuthStorage.getLang())
        setTimeout(() => {
            subTypeArr()
        }, 100);
        getAllDataScienceData(50, 1)
    }, [])

    return (
        <>
            <SectionTitle title={`${t("Data_Management.data_management")}`} subtitle={`${t("Data_Management.data_science")}`} />
            <Widget
                title=""
                description=""
            >
                <div className="flex flex-col lg:flex-row lg:flex-wrap justify-end">
                    <div className="lg:w-1/4 w-full mb-4 ">
                        <div className={`form-element form-element-inline`}>
                            <input
                                name="search"
                                type="text"
                                className="form-input"
                                placeholder={`${t("enter_search_words")}`}
                                value={searchKeyword}
                                onChange={(e) => handleChange(e)}
                            />
                        </div>
                    </div>
                    <div className=" mb-4">
                        <button
                            type="button"
                            className="btn btn-default bg-blue-500 hover:bg-blue-600 text-white btn-rounded w-full pt-5 pb-4 text-xl font-bold"
                            onClick={() => getAllDataScienceData(50, 1)}
                        // disabled={btnDisable}
                        >{t("search")}
                        </button>
                    </div>
                </div>
                <Datatable columns={columns} data={dataScinceList} pagination={false} numberofpage={false} nextprev={false} getRowVal={getRowVal} getSelectedRowIds={getSelectedRowIds} />
            </Widget>
            <div className="flex flex-col lg:flex-row lg:flex-wrap justify-end">
                {/* <div className="mb-4 mr-10 ">
                    <button
                        type="button"
                        className="btn btn-default bg-blue-500 hover:bg-blue-600 text-white btn-rounded w-full pt-5 pb-4 text-xl font-bold "
                        onClick={createHistory}
                    // disabled={btnDisable}
                    >작성하기
                    </button>
                </div> */}
                <span className="ml-auto"></span>
                <div className="mb-4 mr-10 ">
                    <button
                        type="button"
                        className="btn btn-default bg-blue-500 hover:bg-blue-600 text-white btn-rounded w-full pt-5 pb-4 text-xl font-bold "
                        onClick={deleteDataSciencedata}
                        disabled={seletedDeleteIDs ? false : true}
                    >
                        {t("delete_selected")}
                    </button>
                </div>
                <div className="mb-4 ">
                    <button
                        type="button"
                        className="btn btn-default bg-blue-500 hover:bg-blue-600 text-white btn-rounded w-full pt-5 pb-4 text-xl font-bold"
                    // onClick={Login}
                    // disabled={btnDisable}
                    >
                        {t("save")}
                    </button>
                </div>
            </div>
        </>
    )
}

export default List