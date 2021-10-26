import moment from 'moment'
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
                Header: '연도',
                accessor: 'year'
            },
            {
                Header: '월',
                accessor: 'month'
            },
            {
                Header: '내용',
                accessor: 'content'
            },
            {
                Header: '작성일',
                accessor: 'registrationDate'
            }
        ],
        []
    )
    const [searchKeyword, setSearchKeyword] = useState("")
    const [historyDataList, setHistoryDataList] = useState([])
    const [seletedDeleteIDs, setSeletedDeleteIDs] = useState("")

    const getAllHistory = (per_page = 50, page_number = 1) => {
        ApiGet(`CompanyInformation/get-company-information-by-admin?keyword=${searchKeyword}&per_page=${per_page}&page_number=${page_number}`)
            .then((res) => {
                setHistoryDataList(res?.data?.companyInformation &&
                    res?.data?.companyInformation.map((d, index) => {
                        return {
                            id: d?.id,
                            number: index + 1,
                            content: d?.content,
                            month: d?.month,
                            year: d?.year,
                            registrationDate: d?.created_at
                                ? moment(d?.created_at).format("YYYY-MM-DD")
                                : "",
                        }
                    }))
            })
            .catch((error) => {
            });
    }

    const handleChange = (e) => {
        setSearchKeyword(e.target.value)
    }

    const createHistory = () => {
        router.push('/cim/historyManagment/0')
    }

    const getRowVal = (rowData) => {
        // router.push('/cim/historyManagment/'+rowData.id)
    }

    const getSelectedRowIds = (selectedRowIdsData) => {
        const ids = selectedRowIdsData.map((data) => data.id).join(',')
        setSeletedDeleteIDs(ids)
    }

    const deleteHistorys = () => {
        ApiPost(`CompanyInformation/delete-company-information-by-admin`, {
            id: seletedDeleteIDs
        })
            .then((res) => {
                getAllHistory(50, 1)
            })
            .catch((error) => {
                console.log("error", error);
            });
    }

    useEffect(() => {
        getAllHistory(50, 1)
    }, [])

    return (
        <>
            <SectionTitle title="회사 정보 관리" subtitle="연혁 관리" />
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
                            onClick={() => getAllHistory(50, 1)}
                        >검색
                        </button>
                    </div>
                </div>
                <Datatable columns={columns} data={historyDataList} pagination={false} numberofpage={false} nextprev={false} getRowVal={getRowVal} getSelectedRowIds={getSelectedRowIds} />
            </Widget>
            <div className="flex flex-col lg:flex-row lg:flex-wrap justify-end">
                <div className="mb-4 mr-10 ">
                    <button
                        type="button"
                        className="btn btn-default bg-blue-500 hover:bg-blue-600 text-white btn-rounded w-full pt-5 pb-4 text-xl font-bold "
                        onClick={createHistory}
                    >작성하기
                    </button>
                </div>
                <span className="ml-auto"></span>
                <div className="mb-4 mr-10 ">
                    <button
                        type="button"
                        className="btn btn-default bg-blue-500 hover:bg-blue-600 text-white btn-rounded w-full pt-5 pb-4 text-xl font-bold "
                        onClick={deleteHistorys}
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