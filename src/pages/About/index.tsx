import Guide from '@/components/Guide';
import MyPic from './my_pic.jpg';
import Giscus from '@giscus/react';
import './about.less'


const About = () => (
    <div className="about">
        <div className="box">
            <div className="selfLeft">
                <div className="myPic">
                    <img src={MyPic} alt="" />
                    <blockquote className="quotoSICP">
                        <p>「如果说艺术解释了我们的梦想，那么计算机就是以程序的名义执行着它们。」</p>
                        <p style={{ textAlign: 'right', fontStyle: 'italic', fontSize: '12px' }}>
                            —— Alan J.Perlis《计算机程序的构造与解释》
                        </p>
                    </blockquote>
                </div>
                <div className="introduction">
                    <p className="name"><strong>陌上尘</strong></p>
                    <p>一只兴趣使然的程序猿</p>
                    <p>喜欢折腾各种有趣的东西</p>
                    <p>主业写前端，但从不把自己定为前端工程师</p>
                    <p>
                        这里是我的自留处亦是修行地，除了写些博文以外，更多时候我将这作为笔记本，记录见闻和想法。
                    </p>
                    <p>TypeScript、JavaScript、Rust、Go、Lisp...</p>
                    <p><i>lzcers@gmail.com</i></p>
                    <p>
                        <a style={{ textDecoration: 'underline' }} href="https://github.com/lzcers">
                            My GitHub
                        </a>
                    </p>
                </div>
            </div>
            <div className="selfRight">
                <Guide />
            </div>
        </div>
        <div className="comments">
            <Giscus
                id="comments"
                repo="lzcers/giscus"
                repoId="R_kgDOHUCV4w="
                category="留言"
                categoryId="DIC_kwDOHUCV484CPB94"
                mapping="title"
                term="留言"
                reactionsEnabled="1"
                emitMetadata="0"
                inputPosition="top"
                theme="light"
                lang="cn"
                loading="lazy"
            />
        </div>
    </div>
)

export default About
