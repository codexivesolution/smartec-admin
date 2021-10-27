import router from 'next/router'
import React, { useEffect, useState } from 'react'
import Datatable from '../../../components/datatable'
import SectionTitle from '../../../components/section-title'
import Widget from '../../../components/widget'
import { ApiGet, ApiPost } from '../../../helper/API/ApiData'

const List = () => {
    const columns = React.useMemo(
        () => [
            {
                Header: '번호',
                accessor: 'number'
            },
            {
                Header: '성별',
                accessor: 'sex'
            },
            {
                Header: '허리둘레',
                accessor: 'waist_circumference'
            },
            {
                Header: '수축기 혈압',
                accessor: 'systolic_blood_pressure'
            },
            {
                Header: '공복혈당',
                accessor: 'fasting_serum_glucose'
            },
            {
                Header: '중성지방',
                accessor: 'triglyceride'
            },
            {
                Header: '알라닌아미노전이효소',
                accessor: 'alanine_aminotransferase'
            },
            {
                Header: '지방간 유무',
                accessor: 'fatty_liver'
            },
            {
                Header: '지방 수준',
                accessor: 'liver_fat_content'
            }
        ],
        []
    )
    const [searchKeyword, setSearchKeyword] = useState("")
    const [sflcDataList, setSFLCDataList] = useState([])
    const [seletedDeleteIDs, setSeletedDeleteIDs] = useState("")

    const handleChange = (e) => {
        // if (e.target.value !== "") {
        //     setBtnDisable(false)
        // } else {
        //     setBtnDisable(true)
        // }
        setSearchKeyword(e.target.value)
    }

    const getRowVal = (rowData) => {
        // router.push('/cim/investmentInfo/'+rowData.id)
    }

    const getSelectedRowIds = (selectedRowIdsData) => {
        const ids = selectedRowIdsData.map((data) => data.id).join(',')
        setSeletedDeleteIDs(ids)
    }

    const deleteSmartFattyLiverCaredata = () => {
        ApiPost(`smartFattyLiverCare/delete-smart-fatty-liver-care-by-admin`, {
            id: seletedDeleteIDs
        })
            .then((res) => {
                getAllSmartFattyLiverCareData(50, 1)
            })
            .catch((error) => {
                console.log("error", error);
            });
    }


    const getAllSmartFattyLiverCareData = (per_page = 50, page_number = 1) => {
        ApiGet(`smartFattyLiverCare/get-smart-fatty-liver-care-by-admin?keyword=${searchKeyword}&per_page=${per_page}&page_number=${page_number}`)
            .then((res) => {
                console.log("res res", res);
                setSFLCDataList(res?.data?.smartFattyLiverCare &&
                    res?.data?.smartFattyLiverCare.map((d, index) => {
                        return {
                            id: d?.id,
                            number: index + 1,
                            alanine_aminotransferase: d?.alanine_aminotransferase,
                            fasting_serum_glucose: d?.fasting_serum_glucose,
                            fatty_liver: d?.fatty_liver,
                            liver_fat_content: d?.liver_fat_content,
                            sex: d?.sex,
                            systolic_blood_pressure: d?.systolic_blood_pressure,
                            triglyceride: d?.triglyceride,
                            waist_circumference: d?.waist_circumference,
                        }
                    }))
            })
            .catch((error) => {
            });
    }

    useEffect(() => {
        getAllSmartFattyLiverCareData(50, 1)
    }, [])


    return (
        <>
            <SectionTitle title="자료 관리" subtitle="스마트 지방간 케어" />
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
                                placeholder="검색어 입력"
                                value={searchKeyword}
                                onChange={(e) => handleChange(e)}
                            />
                        </div>
                    </div>
                    <div className=" mb-4">
                        <button
                            type="button"
                            className="btn btn-default bg-blue-500 hover:bg-blue-600 text-white btn-rounded w-full pt-5 pb-4 text-xl font-bold"
                            onClick={() => getAllSmartFattyLiverCareData(50, 1)}
                        // disabled={btnDisable}
                        >검색
                        </button>
                    </div>
                </div>
                <Datatable columns={columns} data={sflcDataList} pagination={false} numberofpage={false} nextprev={false} getRowVal={getRowVal} getSelectedRowIds={getSelectedRowIds} />
            </Widget>
            <div className="flex flex-col lg:flex-row lg:flex-wrap justify-end">
                <span className="ml-auto"></span>
                <div className="mb-4 mr-10 ">
                    <button
                        type="button"
                        className="btn btn-default bg-blue-500 hover:bg-blue-600 text-white btn-rounded w-full pt-5 pb-4 text-xl font-bold "
                        onClick={deleteSmartFattyLiverCaredata}
                        disabled={seletedDeleteIDs ? false : true}
                    >선택 삭제
                    </button>
                </div>
                <div className="mb-4 ">
                    <button
                        type="button"
                        className="btn btn-default bg-blue-500 hover:bg-blue-600 text-white btn-rounded w-full pt-5 pb-4 text-xl font-bold"
                    // onClick={Login}
                    // disabled={btnDisable}
                    >저장
                    </button>
                </div>
            </div>
        </>
    )
}

export default List