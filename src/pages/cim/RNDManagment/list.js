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
                Header: '이미지',
                accessor: 'thesis_file'
            },
            {
                Header: '제목',
                accessor: 'title'
            },
            {
                Header: '논문 링크',
                accessor: 'thesis_link'
            },
            {
                Header: '작성일',
                accessor: 'registrationDate'
            }
        ],
        []
    )
    const [searchKeyword, setSearchKeyword] = useState("")
    const [rnDDataList, setRnDDataList] = useState([])
    const [seletedDeleteIDs, setSeletedDeleteIDs] = useState("")

    const handleChange = (e) => {
        setSearchKeyword(e.target.value)
    }

    const getRowVal = (rowData) => {
        // router.push('/cim/RNDManagment/'+rowData.id)
    }

    const getSelectedRowIds = (selectedRowIdsData) => {
        const ids = selectedRowIdsData.map((data) => data.id).join(',')
        setSeletedDeleteIDs(ids)
    }

    const deleteRnDdata = () => {
        ApiPost(`researchAndDevelopment/delete-research-and-development-by-admin`, {
            id: seletedDeleteIDs
        })
            .then((res) => {
                getAllRNDData(50, 1)
            })
            .catch((error) => {
                console.log("error", error);
            });
    }


    const getAllRNDData = (per_page = 50, page_number = 1) => {
        ApiGet(`researchAndDevelopment/get-research-and-development-by-admin?keyword=${searchKeyword}&per_page=${per_page}&page_number=${page_number}`)
            .then((res) => {
                setRnDDataList(res?.data?.researchAndDevelopment &&
                    res?.data?.researchAndDevelopment.map((d, index) => {
                        return {
                            id: d?.id,
                            number: index + 1,
                            content: d?.content,
                            thesis_file: d?.thesis_file,
                            thesis_link: d?.thesis_link,
                            title: d?.title,
                            registrationDate: d?.created_at,
                        }
                    }))
            })
            .catch((error) => {
            });
    }

    const createHistory = () => {
        router.push('/cim/RNDManagment/0')
    }

    useEffect(() => {
        getAllRNDData()
    }, [])

    return (
        <>
            <SectionTitle title="회사 정보 관리" subtitle="연구 개발 관리" />
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
                            onClick={() => getAllRNDData(50,1)}
                        >검색
                        </button>
                    </div>
                </div>
                <Datatable columns={columns} data={rnDDataList} pagination={false} numberofpage={false} nextprev={false}  getRowVal={getRowVal} getSelectedRowIds={getSelectedRowIds} />
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
                    onClick={deleteRnDdata}
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