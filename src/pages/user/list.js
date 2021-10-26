import React, { useEffect, useState } from 'react'
import Datatable from '../../components/datatable'
import { formatNumber } from '../../functions/numbers'
import countries from '../../json/countries.json'
import SectionTitle from '../../components/section-title'
import Widget from '../../components/widget'
import { ApiGet, ApiPut } from '../../helper/API/ApiData'
import moment from 'moment'
import router from 'next/router'

const List = () => {
    const columns = React.useMemo(
        () => [
            {
                Header: '번호',
                accessor: 'number'
            },
            {
                Header: '이메일(아이디)',
                accessor: 'email'
            },
            {
                Header: '이름',
                accessor: 'name'
            },
            {
                Header: '소속',
                accessor: 'organization'
            },
            {
                Header: '국가',
                accessor: 'country'
            },
            {
                Header: '가입일',
                accessor: 'registrationDate',
                // Cell: (props) => <span>{formatNumber(props.value)}</span>
            }
        ],
        []
    )
    const data = React.useMemo(() => countries, [])
    const [searchKeyword, setSearchKeyword] = useState("")
    const [seletedDeleteIDs, setSeletedDeleteIDs] = useState("")
    const [btnDisable, setBtnDisable] = useState(true)
    const [userDataList, setUserDataList] = useState([])

    const handleChange = (e) => {
        if (e.target.value !== "") {
            setBtnDisable(false)
        } else {
            setBtnDisable(true)
        }
        setSearchKeyword(e.target.value)
    }

    const getAllUser = (per_page = 50, page_number = 1) => {
        ApiGet(`admin/getFilteredUser?search_term=${searchKeyword}&per_page=${per_page}&page_number=${page_number}`)
            .then((res) => {
                setUserDataList(res?.data?.users ? res?.data?.users : [])
                setUserDataList(res?.data?.users &&
                    res?.data?.users.map((data, index) => {
                        return {
                            id: data.id,
                            // number: res.data.count - (page - 1) * sizePerPage - index,
                            number: index + 1,
                            email: data.email,
                            name: "",
                            organization: data.organization,
                            country: data.country,
                            registrationDate: data.created_at
                                ? moment(data.created_at).format("YYYY-MM-DD")
                                : "",

                        }
                    }))
            })
            .catch((error) => {
            });
    }

    const getRowVal = (rowData) => {
        router.push('/user/'+rowData.id)
    }

    const getSelectedRowIds = (selectedRowIdsData) => {
        const ids = selectedRowIdsData.map((data) => data.id).join(',')
        setSeletedDeleteIDs(ids)
    }

    const deleteUsers = () => {
        debugger
        ApiPut(`admin/auth/deleteUser`, {
            id: seletedDeleteIDs
        })
            .then((res) => {
                getAllUser(50, 1)
            })
            .catch((error) => {
                console.log("error", error);
            });
    }

    useEffect(() => {
        getAllUser(50, 1)
    }, [])


    return (
        <>
            <SectionTitle title="기본 설정" subtitle="사용자 관리" />
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
                            // onClick={Login}
                            disabled={btnDisable}
                        >검색
                        </button>
                    </div>
                </div>
                <Datatable columns={columns} data={userDataList} pagination={false} numberofpage={false} nextprev={false} getRowVal={getRowVal} getSelectedRowIds={getSelectedRowIds} />
            </Widget>
            <div className="flex flex-col lg:flex-row lg:flex-wrap justify-end">
                <div className="mb-4 mr-10 ">
                    <button
                        type="button"
                        className="btn btn-default bg-blue-500 hover:bg-blue-600 text-white btn-rounded w-full pt-5 pb-4 text-xl font-bold "
                        onClick={deleteUsers}
                    >선택 삭제
                    </button>
                </div>
                <div className="mb-4 ">
                    <button
                        type="button"
                        className="btn btn-default bg-blue-500 hover:bg-blue-600 text-white btn-rounded w-full pt-5 pb-4 text-xl font-bold"
                    // onClick={Login}
                    >저장
                    </button>
                </div>
            </div>
        </>
    )
}

export default List