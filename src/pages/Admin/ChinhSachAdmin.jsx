import { useEffect, useRef, useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { Editor } from "@tinymce/tinymce-react";
import thongTinSan from "../../service/admin/ThongTinSan";
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const ChinhSachAdmin = () => {
    const initialFormData = {
        id: '',
        policies: '',
    };
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState(initialFormData);
    const editorRef = useRef(null);
    const navigate = useNavigate();

    const getThongTin = async () => {
        try {
            const response = await thongTinSan.getThongTinSan();
            const data = response.data.result;
            setFormData({
                id: data.id || '',
                policies: data.policies || '',
            });

        } catch (error) {
            console.log("Error: " + error);
        }
    }
    useEffect(() => {
        getThongTin();
    }, []);

    const putChinhSach = async () => {
        try {
            const response = await thongTinSan.putChinhSach(formData);
            toast.success("Cập nhật thông tin thành công");
            setFormData(initialFormData);
            // setIsSubmitting(true);
            getThongTin();
        } catch (error) {
            toast.error(error.response.data.message);
            console.log("Error: " + error);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        putChinhSach();
    }

    const handleGoBack = () => {
        navigate(-1);
    };
    return (
        <>
            <Breadcrumb pageName="Chính sách sàn" status='Quản Trị' />
            <ToastContainer></ToastContainer>
            <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
                <div className="col-span-12 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className='text-right md:px-6 xl:px-7.5 px-4 pt-6 mr-1 ml-auto'>
                        <button onClick={handleGoBack}
                            className="inline-flex items-center justify-center rounded-md bg-gray-600 py-2 px-3 text-center font-medium text-white hover:bg-opacity-90"
                        >
                            Quay Lại
                        </button>
                    </div>
                    <div className="py-6 flex justify-between px-4 md:px-6 xl:px-7.5">
                        <form onSubmit={handleSubmit} className='w-full'>

                            <Editor
                                apiKey='nt6o2f934qqh01757mffmo7uq3ajflomlwhz6jzaa02xpimo'
                                init={{
                                    plugins: [
                                        'anchor', 'autolink', 'charmap', 'codesample', 'emoticons', 'image', 'link', 'lists', 'media', 'searchreplace', 'table', 'visualblocks', 'wordcount',
                                        'checklist', 'mediaembed', 'casechange', 'export', 'formatpainter', 'pageembed', 'a11ychecker', 'tinymcespellchecker', 'permanentpen', 'powerpaste', 'advtable', 'advcode', 'editimage', 'advtemplate', 'ai', 'mentions', 'tinycomments', 'tableofcontents', 'footnotes', 'mergetags', 'autocorrect', 'typography', 'inlinecss', 'markdown',
                                        'importword', 'exportword', 'exportpdf'
                                    ],
                                    toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
                                    tinycomments_mode: 'embedded',
                                    tinycomments_author: 'Author name',
                                    mergetags_list: [
                                        { value: 'First.Name', title: 'First Name' },
                                        { value: 'Email', title: 'Email' },
                                    ],
                                    ai_request: (request, respondWith) => respondWith.string(() => Promise.reject('See docs to implement AI Assistant')),
                                    exportpdf_converter_options: { 'format': 'Letter', 'margin_top': '1in', 'margin_right': '1in', 'margin_bottom': '1in', 'margin_left': '1in', },
                                    exportword_converter_options: { 'document': { 'size': 'Letter' } },
                                    importword_converter_options: { 'formatting': { 'styles': 'inline', 'resets': 'inline', 'defaults': 'inline', } },
                                }}
                                initialValue={formData.policies}
                                onChange={(evt, editor) => {
                                    (editorRef.current = editor)
                                    if (editorRef.current) {
                                        setFormData((prev) => ({
                                            ...prev,
                                            policies: editorRef.current.getContent(),
                                        }));
                                    }
                                }}
                            />
                            <div className='flex justify-end pt-6 '>
                                <button
                                    // disabled={isSubmitting}
                                    type="submit"
                                    className="ml-auto flex  w-full rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 sm:ml-3 sm:w-auto"
                                >
                                    Xác Nhận
                                    {/* {isSubmitting ? "Vui lòng chờ..." : "Xác Nhận"} */}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ChinhSachAdmin;
