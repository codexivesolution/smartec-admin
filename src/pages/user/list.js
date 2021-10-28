import React, { useEffect, useState } from 'react'
import Datatable from '../../components/datatable'
import SectionTitle from '../../components/section-title'
import Widget from '../../components/widget'
import { ApiGet, ApiPut } from '../../helper/API/ApiData'
import moment from 'moment'
import router from 'next/router'
import { useTranslation } from 'react-i18next';


const List = () => {
    const { t } = useTranslation();

    const columns = React.useMemo(
        () => [
            {
                Header: `${t("number")}`,
                accessor: 'number'
            },
            {
                Header: `${t("Basic_Setting.e_mail_ID")}`,
                accessor: 'email'
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
                Header: `${t("country")}`,
                accessor: 'country'
            },
            {
                Header: `${t("registration_date")}`,
                accessor: 'registrationDate',
                // Cell: (props) => <span>{formatNumber(props.value)}</span>
            }
        ],
        []
    )
    const [searchKeyword, setSearchKeyword] = useState("")
    const [seletedDeleteIDs, setSeletedDeleteIDs] = useState("")
    const [userDataList, setUserDataList] = useState([])

    const handleChange = (e) => {
        setSearchKeyword(e.target.value)
    }

    const getAllUser = (per_page = 50, page_number = 1) => {
        ApiGet(`admin/getFilteredUser?search_term=${searchKeyword}&per_page=${per_page}&page_number=${page_number}`)
            .then((res) => {
                setUserDataList(res?.data?.users &&
                    res?.data?.users.map((data, index) => {
                        return {
                            id: data?.id,
                            // number: res.data.count - (page - 1) * sizePerPage - index,
                            number: index + 1,
                            email: data?.email,
                            name: data?.email,
                            organization: data?.organization,
                            country: data?.country,
                            registrationDate: data?.created_at
                                ? moment(data?.created_at).format("YYYY-MM-DD")
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
            <SectionTitle title={`${t("Basic_Setting.basic_setting")}`} subtitle={`${t("Basic_Setting.user_management")}`} />
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
                            onClick={() => getAllUser()}
                        >
                            {t("search")}
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
                    >
                        {t("save")}
                    </button>
                </div>
            </div>
        </>
    )
}

export default List