import Star from "../Helpers/icons/Star";

export default function Reviews({
  comments
}) {
  return (
    <div className="review-wrapper w-full">
      <div className="w-full reviews mb-[60px]">
        {/* comments */}
        <div className="w-full comments mb-[60px]">
          <div

            className="comment-item bg-white px-10 py-[32px] mb-2.5"
          >
            {comments &&
              comments.length > 0 &&
              comments.map((comment) => (

                <>
                  <div key={comment.id} className="comment-author flex justify-between items-center mb-3 ">
                    <div className="flex space-x-3 items-center">
                      <div className="w-[50px] h-[50px] rounded-full overflow-hidden">
                        <img
                          src={comment?.account?.avatar}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-[14px] font-medium text-qblack">
                          {comment?.account?.fullname}
                        </p>
                        <div className="flex items-center space-x-2">
                          <div className="flex">
                            {Array.from(Array(comment?.star), () => (
                              <span className="w-3 mr-1">
                                <Star />
                              </span>
                            ))}
                          </div>
                          <span className="text-[13px] font-normal text-qblack mt-1 inline-block">
                            ({comment?.star})
                          </span>
                        </div>
                        <p className="text-[13px] font-normal text-qgray">
                          {
                            Intl.DateTimeFormat("en-GB", {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                            }).format(new Date(comment?.createAt))
                          }
                        </p>
                      </div>
                    </div>

                  </div>

                  <div className="px-15">

                    <div className="comment mb-[10px]">
                      <p className="text-[15px] text-qgray leading-7 text-normal">
                        {comment?.content}
                      </p>
                    </div>
                    <div className="flex">
                      {comment?.imageEvalues?.map(image => (
                        <img src={image?.name} className="h-20 mb-4 mr-3" alt="" />
                      ))}

                    </div>
                    {comment?.parentId > 0 ? <div
                      key={comment?.id}
                      className="sub-comment-item bg-gray-100 px-4 pt-[5px]"
                    >
                      <div className="text-[14px]">Phản hồi từ người bán</div>
                      <div className="comment mb-[30px]">
                        <p className="text-[15px] text-qgray leading-7 text-normal">
                          {comment?.content}
                        </p>
                      </div>
                    </div> : ""}
                  </div>
                  <hr className="mb-5" />
                </>





              ))}
          </div>
        </div>
      </div>
    </div>
  );
}


