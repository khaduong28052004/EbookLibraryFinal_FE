import Star from "../Helpers/icons/Star";

export default function Reviews({
  comments
}) {
  return (
    <div className="review-wrapper w-full">
      <div className="w-full reviews mb-[60px]">
        {/* comments */}
        <div className="w-full comments mb-[60px]">
          {comments &&
            comments.length > 0 &&
            comments.map((comment) => (
              <div
                key={comment.id}
                className="comment-item bg-white px-10 py-[32px] mb-2.5"
              >
                {comment?.idParent > 0 ? (
                  <>
                    <div
                      key={comment?.id}
                      className="sub-comment-item bg-white px-10 pt-[32px] border-t"
                    >
                      <div className="comment-author  mb-3">
                        <div className="flex space-x-3 items-center">
                          <div className="w-[50px] h-[50px] rounded-full overflow-hidden">
                            <img
                              src={`/assets/images/comment-user-2.png`}
                              alt=""
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <p className="text-[18px] font-medium text-qblack">
                              {comment?.account?.fullname}
                            </p>
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
                      <div className="comment mb-[30px]">
                        <p className="text-[15px] text-qgray leading-7 text-normal">
                          {comment?.content}
                        </p>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="comment-author flex justify-between items-center mb-3">
                      <div className="flex space-x-3 items-center">
                        <div className="w-[50px] h-[50px] rounded-full overflow-hidden">
                          <img
                            src={comment?.account?.avatar}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="text-[18px] font-medium text-qblack">
                            {comment?.account?.fullname}
                          </p>
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
                      <div className="flex items-center space-x-2">
                        <div className="flex">
                          {Array.from(Array(comment?.star), () => (
                            <span>
                              <Star />
                            </span>
                          ))}
                        </div>
                        <span className="text-[13px] font-normal text-qblack mt-1 inline-block">
                          ({comment?.star})
                        </span>
                      </div>
                    </div>
                    <div className="comment mb-[30px]">
                      <p className="text-[15px] text-qgray leading-7 text-normal">
                        {comment?.content}
                      </p>
                    </div>
                  </>)}


              </div>
            ))}
        </div>
        {/* load comments */}
        {/* <div className="w-full flex justify-center">
          <button
            type="button"
            className="black-btn w-[300px] h-[50px] text-sm font-semibold"
          >
            Load More
          </button>
        </div> */}
      </div>
    </div>
  );
}


