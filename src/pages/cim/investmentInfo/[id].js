import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import SectionTitle from '../../../components/section-title';
import Widget from '../../../components/widget';
import { ApiGet, ApiPost, ApiPut } from '../../../helper/API/ApiData';

const EditInvestmentInfo = () => {
    const router = useRouter();
    const { id } = router.query
    const [investmentData, setInvestmentData] = useState({
        id: "",
        title: "",
        content: "",
        file: ""
    })

    const [imgSrc, setImgSrc] = useState("");
    const [imageName, setImageName] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);

    const handleChange = (e) => {
        setInvestmentData({
            ...investmentData,
            [e.target.name]: e.target.value
        })
    }

    const getInvestmentByID = () => {
        ApiGet(`companyinvestment/get-company-investment-by-id/${id}`)
            .then((res) => {
                setInvestmentData({
                    id: id,
                    title: res.data.title,
                    content: res.data.content,
                    file: res.data.thesis_file
                })
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const saveInevestmentData = () => {
        const body = {
            title: investmentData.title,
            content: investmentData.content,
            file: investmentData.file,
        }
        if (id === "0") {
            ApiPost("companyinvestment/add-company-investment", body)
                .then((res) => {
                    router.push('/cim/investmentInfo/list')
                })
        } else {
            ApiPut("companyinvestment/edit-company-investment/" + id, body)
                .then((res) => {
                    router.push('/cim/investmentInfo/list')
                })
        }
    }

    const DeleteImg = () => {
        setImgSrc("")
        setImageName("")
        setSelectedFile(undefined)
    }

    const fnImageUpload = () => {
        let formData = new FormData();
        if (selectedFile) {
            if (selectedFile) {
                formData.append('image', selectedFile);
            }
            ApiPost("general/file-and-image-upload", formData)
                .then((res) => {
                    console.log("res ============", res);
                    setInvestmentData({
                        ...investmentData,
                        file: res.url
                    })
                })
        }
    }

    useEffect(() => {
        console.log("selectedFile", selectedFile);
        console.log("imageName", imageName);
        console.log("imgSrc", imgSrc);
    }, [selectedFile, imageName, imgSrc])

    useEffect(() => {
        if (!selectedFile) {
            return;
        }
        const objectUrl = URL.createObjectURL(selectedFile);
        setImgSrc(objectUrl);
        setImageName(selectedFile.name)

        fnImageUpload()
        return () => URL.revokeObjectURL(objectUrl);
    }, [selectedFile]);

    useEffect(() => {
        if (id !== "0") {
            getInvestmentByID()
        }
    }, [id])
    useEffect(() => {
        if (id !== "0") {
            getInvestmentByID()
        }
    }, [])

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
                                value={investmentData.title}
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
                            <textarea
                                // ref={item.ref}
                                name="content"
                                className="form-textarea"
                                rows="3"
                                placeholder="내용을 입력하세요."
                                value={investmentData.content}
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

                            <input
                                id="attechImage"
                                type="file"
                                // hidden
                                // src={imgSrc}
                                className="form-input"
                                placeholder="이미지 첨부하기"
                                src={investmentData.file}
                                onChange={(e) => {
                                    if (!e.target.files || e.target.files.length === 0) {
                                        setSelectedFile(undefined);
                                        return;
                                    }
                                    setSelectedFile(e.target.files[0]);
                                }}
                                alt="img"
                                accept="*"
                                className="login-input"
                            />

                            {/* <input
                                name="month"
                                type="file"
                                className="form-input"
                                placeholder="이미지 첨부하기"
                                src={investmentData.file}
                                autoComplete="off"
                                onChange={(e) => handleChange(e)}
                            /> */}
                        </div>
                    </div>
                </div>


            </Widget>

            <div className="flex flex-col lg:flex-row lg:flex-wrap justify-end">
                <div className="mb-4 ">
                    <button
                        type="button"
                        className="btn btn-default bg-blue-500 hover:bg-blue-600 text-white btn-rounded w-full pt-5 pb-4 text-xl font-bold"
                        onClick={saveInevestmentData}
                    >
                        {id ? "수정하기" : "작성하기"}
                    </button>
                </div>
            </div>
        </>
    )
}

export default EditInvestmentInfo
