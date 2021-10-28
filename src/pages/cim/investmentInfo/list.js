import router from 'next/router'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Datatable from '../../../components/datatable'
import SectionTitle from '../../../components/section-title'
import Widget from '../../../components/widget'
import { ApiGet, ApiPost } from '../../../helper/API/ApiData'
import downloadIcon from '../../../images/Vector.png'

const List = () => {
    const columns = React.useMemo(
        () => [
            {
                Header: '번호',
                accessor: 'number'
            },
            {
                Header: '내용',
                accessor: 'content'
            },
            {
                Header: '첨부파일',
                accessor: 'file',
                // Cell: (props) => <span><img src="../../../images/Vector.png" onClick={() => downloadFile(props.value)}/></span>
                // Cell: (props) => <span><a href={props.value} target="_blank" download><img src="../../../images/Vector.png" /></a></span>
                // Cell: (props) => <span><a href="http://6fa1-117-99-107-240.ngrok.io/images/image-1635358636020.pdf" target="_blank" download><img src="../../../images/Vector.png" /></a></span>
                Cell: (props) => <span onClick={() => download(props.value)} ><img src="../../../images/Vector.png" /></span>

            },
            {
                Header: '작성일',
                accessor: 'registrationDate'
            }
        ],
        []
    )
    const [searchKeyword, setSearchKeyword] = useState("")
    const [investmentDataList, setInvestmentDataList] = useState([])
    const [seletedDeleteIDs, setSeletedDeleteIDs] = useState("")

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

    const handleChange = (e) => {
        setSearchKeyword(e.target.value)
    }

    const createHistory = () => {
        router.push('/cim/investmentInfo/0')
    }

    const getRowVal = (rowData) => {
        // router.push('/cim/investmentInfo/'+rowData.id)
    }

    const getSelectedRowIds = (selectedRowIdsData) => {
        const ids = selectedRowIdsData.map((data) => data.id).join(',')
        setSeletedDeleteIDs(ids)
    }

    const deleteRnDdata = () => {
        ApiPost(`companyinvestment/delete-company-investment-by-admin`, {
            id: seletedDeleteIDs
        })
            .then((res) => {
                getAllInvestmentData(50, 1)
            })
            .catch((error) => {
                console.log("error", error);
            });
    }

    const getAllInvestmentData = (per_page = 50, page_number = 1) => {
        ApiGet(`companyinvestment/get-company-investment-by-admin?keyword=${searchKeyword}&per_page=${per_page}&page_number=${page_number}`)
            .then((res) => {
                setInvestmentDataList(res?.data?.companyInvestment &&
                    res?.data?.companyInvestment.map((d, index) => {
                        return {
                            id: d?.id,
                            number: index + 1,
                            content: d?.content,
                            file: d?.file,
                            title: d?.title,
                            registrationDate: d?.created_at,
                        }
                    }))
            })
            .catch((error) => {
            });
    }

    const downloadFile = (file) => {

    }

    useEffect(() => {
        getAllInvestmentData(50, 1)
    }, [])

    return (
        <>
            <SectionTitle title="회사 정보 관리" subtitle="투자 정보" />
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
                            onClick={() => getAllInvestmentData(50, 1)}
                        >검색
                        </button>
                    </div>
                </div>
                <Datatable columns={columns} data={investmentDataList} pagination={false} numberofpage={false} nextprev={false} getRowVal={getRowVal} getSelectedRowIds={getSelectedRowIds} />
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
                    >저장
                    </button>
                </div>
            </div>
        </>
    )
}

export default List