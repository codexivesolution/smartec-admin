import router from 'next/router'
import React, { useState } from 'react'
import Datatable from '../../../components/datatable'
import SectionTitle from '../../../components/section-title'
import Widget from '../../../components/widget'
import countries from '../../../json/countries.json'

const List = () => {
    const columns = React.useMemo(
        () => [
            {
                Header: '번호',
                accessor: 'alpha3Code'
            },
            {
                Header: '성별',
                accessor: 'name'
            },
            {
                Header: '허리둘레',
                accessor: 'capital'
            },
            {
                Header: '수축기 혈압',
                accessor: 'region'
            },
            {
                Header: '공복혈당',
                accessor: 'nativeName'
            },
            {
                Header: '중성지방',
                accessor: ''
            },
            {
                Header: '알라닌아미노전이효소',
                accessor: ''
            },
            {
                Header: '지방간 유무',
                accessor: ''
            },
            {
                Header: '지방 수준',
                accessor: ''
            }
        ],
        []
    )
    const data = React.useMemo(() => countries, [])
    const [searchKeyword, setSearchKeyword] = useState("")
    const [btnDisable, setBtnDisable] = useState(true)

    const handleChange = (e) => {
        if (e.target.value !== "") {
            setBtnDisable(false)
        } else {
            setBtnDisable(true)
        }
        setSearchKeyword(e.target.value)
    }

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
                            // onClick={Login}
                            disabled={btnDisable}
                        >검색
                        </button>
                    </div>
                </div>
                <Datatable columns={columns} data={data} pagination={false} numberofpage={false} nextprev={false} />
            </Widget>
            <div className="flex flex-col lg:flex-row lg:flex-wrap justify-end">
                <span className="ml-auto"></span>
                <div className="mb-4 mr-10 ">
                    <button
                        type="button"
                        className="btn btn-default bg-blue-500 hover:bg-blue-600 text-white btn-rounded w-full pt-5 pb-4 text-xl font-bold "
                    // onClick={Login}
                    // disabled={btnDisable}
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