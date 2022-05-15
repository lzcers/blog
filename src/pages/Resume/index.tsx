import "./styles.less";
import "./iconfont.js";

export default () => {
    const Icon = (props: { name: string }) => (
        <svg className="icon" aria-hidden="true">
            <use xlinkHref={"#icon-" + props.name}></use>
        </svg>
    );

    return (
        <div className="resume heti heti--classic">
            <section className="info">
                <div className="main-info">
                    <h1 className="name">李志成</h1>
                    <h3 className="job">软件开发工程师-前端/全栈</h3>
                </div>
                <div className="more-info">
                    <Icon name={"xingbie-nan"} />
                    <span>男</span>
                    <Icon name={"nianling"} />
                    <span>1993.11</span>
                    <Icon name={"edu-line"} />
                    <span>本科</span>
                    <Icon name="shouji" />
                    <span>
                        <a href="tel:17603050797">17603050797</a>
                    </span>
                    <Icon name={"youxiang"} />
                    <span>
                        <a href="mailto:zack@ksana.net">zack@ksana.net</a>
                    </span>
                    <Icon name={"wangzhan"} />
                    <span>
                        <a href="https://ksana.net">https://ksana.net</a>
                    </span>
                </div>
                <p className="self-desc">
                    <i>我首先是软件开发工程师，热衷折腾各种有意思的技术，其次是前端工程师，擅长跟浏览器死磕，迎难而上。</i>
                </p>
            </section>
            <section className="tech-stack">
                <h3 className="title">技能</h3>
                <div className="lang">
                    <strong>语言：</strong>
                    <b>JavaScript/Typescript</b>/Rust/Go/…
                </div>
                <div className="framework">
                    <strong>框架：</strong>
                    <b>React</b>/Webpack/Vue/Vite/…
                </div>
                <div className="other">
                    <strong>其它：</strong>Node.js/Deno/Koa.js/…
                </div>
            </section>
            <section className="career">
                <div className="header">
                    <h3 className="title">职业历程</h3>
                    <span className="years">
                        2014.7 - 2023.5 <b>7+年</b>
                    </span>
                </div>
                <ul>
                    <li>阿里巴巴 - 达摩院、CCO（高级前端工程师） 2018.10 - 至今</li>
                    <li>蜂投网（前端技术主管，带 12 人团队）2018.3 - 2018.10</li>
                    <li>华为技术有限公司 - 流程IT、2012实验室 2014.12 - 2017.12</li>
                    <li>Anker 2014.7 - 2014.9（实习）</li>
                </ul>
            </section>
            <section className="work-experience">
                <h3 className="title">工作经历</h3>
                <div className="p-item">
                    <h5>阿里巴巴 （高级前端工程师） 2018.10 - 至今</h5>
                    <p>
                        负责多项业务的前端技术方案设计与开发，带领合作伙伴支撑前端业务需求高效高质量交付。 负责团队技术氛围营造，组织策划团队进行技术分享，其中内部分享 13 次，外部 2
                        次（前端早早聊）。参与社招、校招招聘，作为实习生师兄，帮助其在实习期间取得技术与业务成果并通过转正答辩。
                        <br />
                        参与阿里云藏经阁前端技术分享组织，累计组织 12+ 期，负责技术分享主题收集，线上技术分享活动组织，提升团队影响力。
                        参与集团前端技术委员会共建项目（低代码搭建方向-设计研发一体化），带回共建成果自研组件平台提升团队研发效率。
                    </p>
                    <div className="project-type">平台项目</div>
                    <ul>
                        <li>
                            <b>热线小蜜：2018.11— 现在</b> <br />
                            <p>
                                阿里集团用于热线客服呼入与呼出咨询业务的对话机器人，支撑集团日均百万级外呼量与大量客服咨询。 负责整个热线产品相关业务全部前端技术方案设计与开发，从 0 到 1 完成 B 端 SPD
                                对话流配置平台的前端开发，持续优化迭代平台能力，完成 SPD 1.0、2.0、3.0 呼入呼出一体化升级改造并制定迁移方案。 同时带领合作伙伴支撑呼入呼出、AIboost
                                等前端的日常迭代需求。
                            </p>
                            <p>
                                在升级改造中沉淀流程图库，参与并贡献开源项目 <a href="https://github.com/alibaba/GGEditor">GGEditor</a>，基于早期 G6
                                实现常见的节点、边操作、命令系统与复杂样式的节点定制，封装高级功能如节点回溯点亮、撤销重做、自动对齐、自动布局、圈选等，提供无框架依赖的 SDK 供团队使用，应用于云小蜜 DS
                                等业务，为团队研发提效。
                            </p>
                            <p>
                                沉淀研发提效工具 Shuaiguo，基于 TypeScript 类型标注生成 JSON Schema，运行时对接口出入参进行检验，在参数与约定不一致时通过 Widget
                                面板提示，提升联调效率，方便测试定位问题。
                            </p>
                            <p>自研微前端库 MicroBox 使用 ShadowDOM + CSS 命名空间 + Proxy 沙箱实现，解决中后台管理系统中多版本 antd 之间冲突问题。</p>
                        </li>
                        <li>
                            <b>鹿班云视频 - 云剪</b> <br />
                            <p>通过算法能力，大规模批量生产电商短视频的平台，用户可以基于模板或商品详情页面链接，直接生成视频创作脚本，填入文案与视频素材，便可快速生成短视频。</p>
                            <p>带领合作伙伴负责 Web 端，开发较复杂的视频脚本编辑组件、音视频编辑组件。</p>
                            <p>与设计共同产出专利一项 《基于脚本文本编辑的短视频智能创作工具外观设计专利》</p>
                        </li>
                        <li>
                            <b>众包 NewJob标注平台 2019 - 2020.4</b> <br />
                            <p>
                                NewJob标注平台，作为人工智能的水电煤，算法模型开发中需要大量的标注数据，而外包费用太贵，带领合作伙伴自研图像、音视频打标平台，通过众包方式将打标任务分发出去来降低数据采集成本，提高标注效率。
                            </p>
                            <p>通过 Rust wasm-bindgen 将一个 SLIC 超像素分割算法库编译到 WASM，将性能提升了 20 倍 9.006s - 0.431s，极大提升图像标注效率。</p>
                        </li>
                    </ul>
                    <div className="project-type">创新项目</div>
                    <ul>
                        <li>
                            <b>VEDITOR Web 端音视频编辑器</b> <br />
                            <p>
                                在云剪技术沉淀的基础上结合小蜜业务场景，探索使用视频知识的方式解决因知识冗长、难以理解导致的满意度、转人工率等指标不理想的问题。为飞猪、天猫超市、LAZADA
                                等经济体提供视频知识低成本高效率模板化的生产方案。
                            </p>
                            <p>
                                在十六届 D2 前端技术大会上分享<a href="https://github.com/d2forum/16th">《Web端短视频编辑器的设计与实现 - 像做PPT一样做视频》</a>
                            </p>
                            <p>沉淀技术专利一项《一种基于分镜的 Web 端视频知识与富媒体创作工具》</p>
                        </li>
                        <li>
                            <b>音画小蜜</b> <br />
                            <p>
                                一个多模态交互对话机器人，孵化于内部黑客马拉松，用于探索电话机器人的未来可能性，在语音交互以外新增屏幕触控操作与音视频等内容，开发 MVP 版本并灰度测试 10+
                                场景，对比满意度提升 2.1%。开发 H5 端交互界面，实现响应麦克风输入的<a href="https://zhuanlan.zhihu.com/p/352661639">语音球效果</a>等，通过 WebSocket
                                与服务端进行上下行指令传输。
                            </p>
                            <p>基于 Slate.js 自制简易的富文本编辑器，用于音画小蜜对话内容的编排。</p>
                        </li>
                        <li>
                            <b>五号小蜜一体机</b> <br />
                            <p>
                                真人形象复刻的虚拟对话机器人，通过一体机承载结合多种传感器可直接面对面语音、触控、手势交互，基于 TensorFlow
                                模型实现姿态识别，为小游戏提升了交互体验，在公司内双十一活动中受到好评。
                            </p>
                        </li>
                    </ul>
                </div>
                <div className="p-item">
                    <h5>蜂投网（前端技术主管）2018.3 - 2018.10</h5>
                    <p>负责公司 App、官网、活动页、后台管理系统等前端需求的开发与管理，制定前端技术方案，招聘新人与绩效考核。</p>
                    <p>
                        作为前端 Leader 为团队答疑解惑救火，营造技术氛围，帮助团队成员解决技术难题，作为火车头牵引团队高效、高质量交付前端需求。负责新产品 壹诺信用 的技术方案与研发（React Native）。
                    </p>
                </div>
                <div className="p-item">
                    <h5>华为 2014.12 - 2017.12</h5>
                    <p>交付内部多个 MIS 项目，参与公司变革项目前端开发与技术预研，参与华为公有云产品开发。</p>
                    <p>受 Scrum 敏捷管理等技能培训，担任部门总体技术组的执行秘书，组织会议、技术分享、讨论等活动。</p>
                    <div className="project-type">平台项目</div>
                    <ul>
                        <li>
                            <b>AppBuilder</b>
                            <br />
                            <p>
                                应用开发工厂是一个采用图形化布局、拖拉拽操作、配置化设置，通过对大量可复用的应用元数据（如UI、模板、逻辑等）采用积木式组装，实现快速、高效构建应用的在线开发平台。
                                参与了其中 web 构建器的开发工作，搭建项目，编写 <b>Webpack</b> 构建配置，独立完成了 Web 构建器公有云版从设计到 Demo
                                的实现，完成了基于元数据渲染页面的技术实现，引入了开源代码提升开发效率，带领新人开发组件， 主要涉及技术有 <b>Vue.js、WebPack、IView</b> 等前端工具及开源库。
                            </p>
                        </li>
                        <li>
                            <b>某内部变革项目</b> <br />
                            <p>
                                该系统支撑公司内部业务流程端到端打通，支撑华为运营商业务，支撑产品配置与报价。参与系统的前后端开发工作，前端使用 webix
                                框架，参与了前端配置引擎的预研开发工作，期间学习了规则引擎原理和相关的 <a href="https://github.com/lzcers/KsanaRete">Rete 算法</a>
                                ，开发了一个在前端编写规则进行产品配置的 Demo。
                            </p>
                        </li>
                        <li>
                            <p>
                                <b>某内部页面构建平台</b>
                                <br />
                                <p>
                                    基于卡片概念创建 Portal 页面的应用，用户可以按照开发规范开发卡片，上传至卡片市场，使用时从卡片市场中拖拽卡片至布局管理器从而构建 Portal 页面。主要涉及开发技术有
                                    <b>React.js、Redux、React-Router，</b>参与了卡片市场的前端开发工作，搭建项目脚手架，引入开源代码，参与卡片开发规范制定，解决了卡片远程动态加载等技术问题。
                                </p>
                            </p>
                        </li>
                    </ul>
                    <div className="project-type">管理信息系统项目</div>
                    <ul>
                        <li>
                            <b>某信息管理系统</b> <br />
                            <p>
                                完成开发交付，该工具系统承载服务类基础数据，提供服务鉴权查询、支撑存量经营、订单履行。
                                承担了部分面向公司内部的页面开发工作，独立完成华为企业服务微信公众号上维保查询功能的前后端开发，主要涉及技术 JQuery、Amaze UI。
                            </p>
                        </li>
                        <li>
                            <b>某研发物料管理的系统</b> <br />
                            <p>
                                该系统采用账目数据为中心的设计，交付极大提高物料获取效率和利用率，且能及时发现异常。在该系统交付过程中做了部分前端页面开发工作，涉及技术有JQuery，Echarts用于呈现账目报表，使用
                                ES6 的新语法特性处理大量报表数据并发加载的问题。{" "}
                            </p>
                        </li>
                    </ul>
                </div>
                <div className="p-item">
                    <h5>Anker 2018.3 - 2018.10（实习）</h5>
                    <p>
                        维护公司内部的售后邮箱管理系统，处理一些简单需求和 BUG 单，学习了基于 <b>Git</b> 版本控制系统的团队协作，以及如何阅读与修改大型开源 PHP 系统代码。
                    </p>
                </div>
            </section>
            <section className="other-experience">
                <ul>
                    <li>
                        <a href="https://d2.alibabatech.com/">第十六届D2前端技术论坛</a> 演讲者
                    </li>
                    <li>
                        <a href="https://github.com/alibaba/GGEditor">GGEditor 图编辑器开源项目开发者</a>
                    </li>
                    <li>阿里巴巴 FAST 天文台寻星公益项目开发者</li>
                    <li>阿里巴巴 CCO 黑客马拉松连续参与者-四等奖</li>
                    <li>华为首届黑客马拉松二等奖，华为明日之星奖</li>
                    <li>
                        在校期间 自学 MOOC 课程《数据结构》取得<a href="https://oss.ksana.net/mooc-certificate.pdf">证书</a>
                    </li>
                    …
                </ul>
            </section>
        </div>
    );
};
