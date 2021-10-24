import React, { useState } from 'react'
import Datatable from '../../components/datatable'
import { formatNumber } from '../../functions/numbers'
import countries from '../../json/countries.json'
import SectionTitle from '../../components/section-title'
import Widget from '../../components/widget'

const List = () => {
    const columns = React.useMemo(
        () => [
            {
                Header: '번호',
                accessor: 'alpha3Code'
            },
            {
                Header: '이메일(아이디)',
                accessor: 'name'
            },
            {
                Header: '이름',
                accessor: 'capital'
            },
            {
                Header: '소속',
                accessor: 'region'
            },
            {
                Header: '국가',
                accessor: 'nativeName'
            },
            {
                Header: '가입일',
                accessor: 'population',
                Cell: (props) => <span>{formatNumber(props.value)}</span>
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
                <Datatable columns={columns} data={data} pagination={false} numberofpage={false} nextprev={false} />
            </Widget>
            <div className="flex flex-col lg:flex-row lg:flex-wrap justify-end">
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