import Facebook from "../../../Helpers/icons/Facebook";
import Instagram from "../../../Helpers/icons/Instagram";
import Youtube from "../../../Helpers/icons/Youtube";

export default function Footer({ type }) {
  return (
    <footer className="lg:footer-section-wrapper bg-white lg:print:hidden">
      <div className="container-x block mx-auto pt-[56px]">
        <div className="xl:w-full xl:flex xl:flex-col lg:items-center lg:mb-[50px]">
          {/* logo area */}
          {/* <div className="mb-[40px]">
            {type === 3 ? (
              <a href="/">
                <img
                  width="152"
                  height="36"
                  src={`/assets/images/logo-3.svg`}
                  alt="logo"
                />
              </a>
            ) : (
              <a href="/">
                <img
                  width="152"
                  height="36"
                  src={`/assets/images/logo.svg`}
                  alt="logo"
                />
              </a>
            )}
          </div> */}
          <div className="lg:w-full h-[1px] bg-[#E9E9E9]"></div>
        </div>
        <div className="lg:flex justify-between mb-[50px]">
          <div className="lg:w-[450px] xl:w-[450px] xl:mb-0 lg:mr-5 xl:w-[450px]   w-[600px]  ml-0 mb-10 w-full ">
            <h1 className="text-[18] font-500 text-[#2F2F2F] mb-5">Giới thiệu về chúng tôi</h1>
            <p className=" text-[#9A9A9A] text-[15px] leading-[28px]">
              Chúng tôi biết rằng có rất nhiều nhà phát triển tiềm năng nhưng chúng tôi tự hào là một công ty trong ngành.
            </p>
          </div>
          <div className="flex lg:flex w-full">
            <div className="lg:w-2/3 w-full mb-10 lg:mb-0">
              <div className="mb-5">
                <h6 className="text-[18] font-500 text-[#2F2F2F]">Về chúng tôi</h6>
              </div>
              <div>
                <ul className="flex flex-col space-y-4 ">
                  <li>
                    <a href="/about">
                      <span className="text-[#9A9A9A] text-[15px] hover:text-qblack border-b border-transparent hover:border-qblack cursor-pointer capitalize">
                        Giới thiệu về chúng tôi
                      </span>
                    </a>
                  </li>
                  <li>
                    <a href="/terms-condition">
                      <span className="text-[#9A9A9A] text-[15px] hover:text-qblack border-b border-transparent hover:border-qblack cursor-pointer capitalize">
                        Điều khoản và điều kiện
                      </span>
                    </a>
                  </li>
                  <li>
                    <a href="/quyche-hoatdong">
                      <span className="text-[#9A9A9A] text-[15px] hover:text-qblack border-b border-transparent hover:border-qblack cursor-pointer capitalize">
                        Quy chế hoạt động
                      </span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="lg:w-2/3 lg:flex lg:flex-col items-center w-full mb-10 lg:mb-0 ">
              <div>
                <div className="mb-5">
                  <h6 className="text-[18] font-500 text-[#2F2F2F]">
                    Dành cho người mua 
                  </h6>
                </div>
                <div>
                  <ul className="flex flex-col space-y-4 ">
                    <li>
                      <a href="/blogs">
                        <span className="text-[#9A9A9A] text-[15px] hover:text-qblack border-b border-transparent hover:border-qblack cursor-pointer capitalize">
                          Hướng dẫn mua hàng
                        </span>
                      </a>
                    </li>
                    <li>
                      <a href="/tracking-order">
                        <span className="text-[#9A9A9A] text-[15px] hover:text-qblack border-b border-transparent hover:border-qblack cursor-pointer capitalize">
                          Chính sách đổi trả
                        </span>
                      </a>
                    </li>
                    <li>
                      <a href="/contact">
                        <span className="text-[#9A9A9A] text-[15px] hover:text-qblack border-b border-transparent hover:border-qblack cursor-pointer capitalize">
                          Liên hệ
                        </span>
                      </a>
                    </li>
                  
                  </ul>
                </div>
              </div>
            </div>
            <div className="lg:w-2/3 lg:flex lg:flex-col items-center w-full mb-10 lg:mb-0">
              <div>
                <div className="mb-5">
                  <h6 className="text-[18] font-500 text-[#2F2F2F]">Dành cho người bán</h6>
                </div>
                <div>
                  <ul className="flex flex-col space-y-4 ">
                    <li>
                      <a href="/ban-hang">
                        <span className="text-[#9A9A9A] text-[15px] hover:text-qblack border-b border-transparent hover:border-qblack cursor-pointer capitalize">
                          Hướng dẫn bán hàng
                        </span>
                      </a>
                    </li>
                    <li>
                      <a href="/chinh-sach">
                        <span className="text-[#9A9A9A] text-[15px] hover:text-qblack border-b border-transparent hover:border-qblack cursor-pointer capitalize">
                          Chính sách người bán
                        </span>
                      </a>
                    </li>
                    <li>
                      <a href="/become-saller">
                        <span className="text-[#9A9A9A] text-[15px] hover:text-qblack border-b border-transparent hover:border-qblack cursor-pointer capitalize">
                          Trở thành người bán
                        </span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bottom-bar border-t border-qgray-border lg:h-[82px] lg:flex justify-between items-center">
          <div className="flex lg:space-x-5 justify-between items-center mb-3">
            <div className="flex space-x-5 items-center">
              <a href="#">
                <Instagram className="fill-current text-qgray hover:text-qblack" />
              </a>
              <a href="#">
                <Facebook className="fill-current text-qgray hover:text-qblack" />
              </a>
              <a href="https://www.facebook.com/share/1B1GPj2t3e/">
                <Youtube className="fill-current text-qgray hover:text-qblack" />
              </a>
            </div>
            <span className="sm:text-base text-[10px] text-qgray font-300">
              ©2024
              <a
                href="https://quomodosoft.com/"
                target="_blank"
                rel="noreferrer"
                className="font-500 text-qblack mx-1"
              >
                The Only E-book Library
              </a>
              Bảo lưu mọi quyền
            </span>
          </div>
          <div className="">
            <a href="#">
              <img
                width="318"
                height="28"
                src={`/assets/images/payment-getways.png`}
                alt="payment-getways"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
