import Guide from "@/components/Guide";
import MyPic from "./my_pic.jpg";
import "./about.less";

const About = () => {
    return (
        <div className="about">
            <div className="self">
                <div className="selfLeft">
                    <div className="myPic">
                        <img src={MyPic} alt="" />
                        <blockquote className="quotoSICP">
                            <p>「如果说艺术解释了我们的梦想，那么计算机就是以程序的名义执行着它们。」</p>
                            <p style={{ textAlign: "right", fontStyle: "italic", fontSize: "12px" }}>—— Alan J.Perlis《计算机程序的构造与解释》</p>
                        </blockquote>
                    </div>
                    <div className="introduction">
                        <p style={{ marginTop: 16 }}>
                            我是<strong>陌尘</strong>，一只兴趣使然的程序猿，喜欢折腾各种有趣的东西
                        </p>
                        <p>主业写前端，但从不把自己定为前端工程师</p>
                        <p>这是我的修行处，我在这记录想法与见闻</p>

                        <p style={{ marginTop: 16 }}>
                            <i>技术：TypeScript、JavaScript、Rust、Go、Lisp...</i>
                        </p>
                        <p>
                            <i>Email：lzcers@gmail.com</i>
                        </p>
                        <p>
                            <i>
                                <a style={{ textDecoration: "underline" }} href="https://github.com/lzcers">
                                    My GitHub
                                </a>
                            </i>
                        </p>
                    </div>
                </div>
                <div className="selfRight">
                    <Guide />
                </div>
            </div>
        </div>
    );
};

export default About;
