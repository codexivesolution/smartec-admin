import router from 'next/router'
import React, { useEffect, useState } from 'react'
import Datatable from '../../../components/datatable'
import SectionTitle from '../../../components/section-title'
import Widget from '../../../components/widget'
import { ApiGet, ApiPost } from '../../../helper/API/ApiData'
import countries from '../../../json/countries.json'

const List = () => {
    const columns = React.useMemo(
        () => [
            {
                Header: '번호',
                accessor: 'alpha3Code'
            },
            {
                Header: '유형',
                accessor: 'name'
            },
            {
                Header: '성명',
                accessor: 'capital'
            },
            {
                Header: '소속',
                accessor: 'region'
            },
            {
                Header: '내용',
                accessor: 'nativeName'
            },
            {
                Header: '제출파일',
                accessor: ''
            },
            {
                Header: '작성일',
                accessor: ''
            }
        ],
        []
    )
    const data = React.useMemo(() => countries, [])
    const [searchKeyword, setSearchKeyword] = useState("")
    const [dataScinceList, setDataScinceList] = useState([])
    const [seletedDeleteIDs, setSeletedDeleteIDs] = useState("")

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
        // router.push('/cim/investmentInfo/'+rowData.id)
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
                console.log("res res list ", res);
                // setDataScinceList(res?.data?.dataScience &&
                //     res?.data?.dataScience.map((d, index) => {
                //         return {
                //             id: d?.id,
                //             number: index + 1,
                //             content: d?.content,
                //             file: d?.file,
                //             title: d?.title,
                //             registrationDate: d?.created_at,
                //         }
                //     }))
            })
            .catch((error) => {
            });
    }

    useEffect(() => {
        getAllDataScienceData(50, 1)
    }, [])

    return (
        <>
            <SectionTitle title="자료 관리" subtitle="데이터 사이언스" />
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
                        onClick={() => getAllDataScienceData(50,1)}
                        // disabled={btnDisable}
                        >검색
                        </button>
                    </div>
                </div>
                <Datatable columns={columns} data={data} pagination={false} numberofpage={false} nextprev={false} getRowVal={getRowVal} getSelectedRowIds={getSelectedRowIds} />
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