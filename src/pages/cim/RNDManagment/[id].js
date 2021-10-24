import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import SectionTitle from '../../../components/section-title';
import Widget from '../../../components/widget';

const EditRnDManage = () => {
    const router = useRouter();
    const { id } = router.query
    const [userData, setUserData] = useState({
        id: "",
        title: "",
        content: "",
        thesisLink: "",
        image: ""

    })

    const handleChange = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        })
    }

    const getUserByID = () => {
        ApiGet(`general/getFuneralNewsByID/${id}`)
            .then((res) => {
                setUserData({
                    id: id,
                    title: "",
                    content: "",
                    thesisLink: "",
                    image: ""
                })
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const saveUser = () => {
        router.push('/cim/RNDManagment/list')
    }

    useEffect(() => {
        debugger
        if (id > 0) {
            setUserData({
                title: "title test",
                content: "test content",
                thesisLink: "www.link.com",
                image: "image.png"
            })
        }
    }, [id])
    return (
        <>
            <SectionTitle title="기본 설정" subtitle="연구 개발 관리" />
            <Widget
                title="새 글 작성하기"
                description=""
            >
                <div className="flex flex-col lg:flex-row lg:flex-wrap w-full lg:space-x-4 mb-10">
                    <div className="w-full lg:w-1/4">
                        <div className={`form-element form-element-inline`}>
                            <div className="form-label">제목</div>
                            <input
                                name="title"
                                type="text"
                                className="form-input"
                                placeholder="제목을 입력하세요."
                                value={userData.title}
                                autoComplete="off"
                                onChange={(e) => handleChange(e)}
                            />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row lg:flex-wrap w-full lg:space-x-4 mb-10">
                    <div className="w-full lg:w-1/4">
                        <div className={`form-element form-element-inline`}>
                            <div className="form-label">내용</div>
                            {/* <input
                                name="content"
                                type="text"
                                className="form-input"
                                placeholder="내용을 입력하세요."
                                value={userData.content}
                                autoComplete="off"
                                onChange={(e) => handleChange(e)}
                            /> */}
                            <textarea
                                // ref={item.ref}
                                name="content"
                                className="form-textarea"
                                rows="3"
                                placeholder="내용을 입력하세요."
                                value={userData.content}
                                autoComplete="off"
                                onChange={(e) => handleChange(e)}
                            >
                            </textarea>
                        </div>
                    </div>
                </div>


                <div className="flex flex-col lg:flex-row lg:flex-wrap w-full lg:space-x-4 mb-10">
                    <div className="w-full lg:w-1/4">
                        <div className={`form-element form-element-inline`}>
                            <div className="form-label">논문 링크</div>
                            <input
                                name="thesisLink"
                                type="text"
                                className="form-input"
                                placeholder="논문 링크를 입력하세요."
                                value={userData.thesisLink}
                                autoComplete="off"
                                onChange={(e) => handleChange(e)}
                            />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row lg:flex-wrap w-full lg:space-x-4 mb-10">

                    <div className="w-full lg:w-1/4">
                        <div className={`form-element form-element-inline`}>
                            <input
                                name="month"
                                type="file"
                                className="form-input"
                                placeholder="이미지 첨부하기"
                                src={userData.image}
                                autoComplete="off"
                                onChange={(e) => handleChange(e)}
                            />
                        </div>
                    </div>
                </div>


            </Widget>

            <div className="flex flex-col lg:flex-row lg:flex-wrap justify-end">
                <div className="mb-4 ">
                    <button
                        type="button"
                        className="btn btn-default bg-blue-500 hover:bg-blue-600 text-white btn-rounded w-full pt-5 pb-4 text-xl font-bold"
                        onClick={saveUser}
                    >
                        {id ? "수정하기" : "작성하기"}
                    </button>
                </div>
            </div>
        </>
    )
}

export default EditRnDManage
