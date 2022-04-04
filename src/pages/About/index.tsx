import Guide from '@/components/Guide';
import MyPic from './my_pic.jpg';
import './about.less'

const About = () => (
    <div className="about">
        <div className="selfLeft">
            <div className="myPic">
                <img src={MyPic} alt="" />
                <blockquote className="quotoSICP">
                    <p>
                        「如果说艺术解释了我们的梦想，那么计算机就是以程序的名义执行着它们。」
                    </p>
                    <p style={{ textAlign: 'right', fontStyle: 'italic', fontSize: '12px' }}>
                        —— Alan J.Perlis《计算机程序的构造与解释》
                    </p>
                </blockquote>
            </div>
            <strong><p className="name">陌上尘</p></strong>
            <p>一只兴趣使然的程序猿</p>
            <p>喜欢折腾各种有趣的东西</p>
            <p>主业写前端，但从不把自己定为前端工程师</p>
            <p>TypeScript、JavaScript、Rust、Go、Lisp...</p>
            <p>
                <a style={{ textDecoration: 'underline' }} href="https://github.com/lzcers">
                    My GitHub
                </a>
            </p>
            <i>lzcers@gmail.com</i>
        </div>
        <div className="selfRight">
            <Guide />
        </div>
    </div>
)

export default About
