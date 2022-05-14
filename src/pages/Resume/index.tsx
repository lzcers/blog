import './styles.less';
import './iconfont.js';

export default () => {
  
  const Icon = (props: {name: string}) => (
    <svg className="icon" aria-hidden="true">
      <use xlinkHref={"#icon-" + props.name}></use>
    </svg>
  );

  return (
    <div className="resume">
      <section className="info">
        <div className="main-info">
          <h1 className="name">李志成</h1>
          <h3 className="job">
            软件开发工程师-前端/全栈
          </h3>
        </div>
        <div className="more-info">
          <Icon name={"xingbie-nan"}/><span>男</span>
          <Icon name={"nianling"} /><span>1993.11</span>
          <Icon name={"edu-line"} /><span>本科</span>
          <Icon name="shouji" /><span><a href="tel:17603050797">17603050797</a></span>
          <Icon name={"youxiang"} /><span><a href="mailto:zack@ksana.net">zack@ksana.net</a></span>
          <Icon name={"wangzhan"} /><span><a href="https://ksana.net">https://ksana.net</a></span>
        </div>
        <p className="self-desc"><i>我首先是软件开发工程师，会持续关注业界动态，热衷折腾各种有意思的技术，其次才是前端工程师，擅长跟浏览器死磕，喜欢迎难而上。</i></p>
      </section>
      <section className="tech-stack">
          <div className="lang">
            <strong>语言：</strong><b>JavaScript/Typescript</b>/Rust/Go/WebAssembly…
          </div>
          <div className="framework">
            <strong>框架：</strong><b>React</b>/Vue/Webpack/Vite/…
          </div>
          <div className="other">
            <strong>其它：</strong>Node.js/Deno/Koa.js…
          </div>
      </section>
      <section className="career">
        <div className="header">
          <h3 className="title">职业经历</h3>
          <span className="years">2014.7 - 2023.5 <b>7+年</b></span>
        </div>
        <ul>
          <li>阿里巴巴 - 达摩院、CCO（高级前端工程师） 2018.10 - 至今</li> 
          <li>蜂投网（前端技术主管，带 12 人团队）2018.3 - 2018.10</li>
          <li>华为技术有限公司 - 流程IT、2012实验室 2014.12 - 2017.12</li>
          <li>Anker 2014.7 - 2014.9（实习）</li>
        </ul>
      </section>
      <section className="work-experience">
        <h3 className="title">工作历程</h3>
        <div className="p-item">
          <h5>阿里巴巴 （高级前端工程师） 2018.10 - 至今</h5>
          <p>
            <span>负责多条业务线的前端技术方案设计与开发，带领合作伙伴支撑业务的前端需求高效高质量交付。</span>
            <span>负责团队技术氛围营造，组织策划技术分享会与团队例行会议，参与集团前端技术委员会共建项目（低代码搭建方向-设计研发一体化），带回共建成果自研组件平台提升团队研发效率。</span>
            <span>参与阿里云藏经阁前端技术分享组织，累计组织 12+ 期，负责技术分享主题收集，线上技术分享活动组织，提升团队影响力。</span>  
          </p>
          <div className="project-type">平台项目</div>
          <ul>
            <li>
              <b>热线小蜜：2018.11— 现在</b> <br/>
              <p>
              阿里集团用于热线客服咨询业务的对话机器人，支持呼入呼出两种形式，支撑集团日均百万级外呼量与大量客服呼入咨询。
              负责整个热线产品相关全部前端业务，从 0 到 1 完成B端SPD对话流配置平台的搭建与开发，持续优化迭代平台能力，完成spd1.0、2.0、3.0 呼入呼出一体化升级改造，制定迁移方案。
              同时带领合作伙伴支撑呼入呼出、AIboost 等前端的日常迭代需求。
              </p>
              <p>
                在升级改造中沉淀流程图框架，参与并贡献开源项目 GGEditor，基于早期 g6 实现常见的节点、边操作，命令系统，高级功能封装，节点回溯点亮，撤销重做，自动对齐，自动布局，圈选等操作，复杂样式的节点定制开发 封装非框架依赖的 sdk 供团队使用，并应用于云小蜜 DS 等业务上，为团队研发提效。
              </p>
              <p>沉淀研发提效工具shuaiguo，基于TypeScript 类型标注生成 schemeJSON 运行时对接口出去参进行检验的工具，一旦后端接口返回参数与约定不一致便会提示，方便测试定位问题和联调。</p>
            </li>
            <li>
              <b>众包 NewJob标注平台 2019 - 2020.4</b> <br/>
              <p>
                众包 NewJob标注平台，作为人工智能的水电煤，算法模型开发中需要大量的标注数据，而外包费用太贵，带领合作伙伴自研图像、音视频打标平台，通过众包方式将打标任务分发出去来降低数据采集成本，提高标注效率。
              </p>
              <p>通过 Rust WASM Bindgen 优化，将图像 SLIC 超像素分割算法性能提升了 20 倍 9.006s - 0.431s。极大提升图像标注效率。</p>
            </li>
          </ul>
          <div className="project-type">创新项目</div>
          <ul>
            <li>
              <b>VEDITOR Web端音视频编辑器</b> <br/>
              <p>在云剪技术沉淀的基础上结合小蜜业务场景，探索使用视频知识的方式来解决知识冗长、难以理解导致的满意度、转人工率等指标不理想的问题。为飞猪、天猫超市、LAZADA 等经济体提供视频知识低成本高效率模板化的生产能力。</p>
              <p>在十六届 D2 前端技术大会上作为演讲嘉宾分享 《Web 端视频编辑器的设计与实现》</p>
              <p>沉淀技术专利一项</p>
            </li>
            <li>
              <b>五号小蜜一体机开发</b> <br/>
              <p>基于真人形象复刻虚拟对话机器人，一体机，实现其中小游戏，基于tf实现动作识别，在公司内双十一活动中受到好评。</p>
            </li>
            <li>
              <b>鹿班云视频</b> <br/>
              <p>基于算法能力，批量大规模生产视频</p>
            </li>
          </ul>
        </div>
        <div className="p-item">
          <h5>蜂投网（前端技术主管 12 人团队）2018.3 - 2018.10</h5>
          <p>负责公司手机 APP（Hybrid App）首页、活动页、后台管理系统等前端部分开发与管理，前端技术方案选型、招聘新人与绩效考核。</p>
          <p>作为前端 Leader 为团队答疑解惑救火，营造技术氛围，帮助团队成员解决技术难题，作为火车头牵引团队高效、高质量交付前端需求。</p>
          <p>负责前端工作内容的分工与协作，支撑公司前端研发任务（日常活动页、App 研发、问题处理）</p>
          <p>负责新应用 壹诺信用 的技术选型与研发（React Native）</p>
        </div>
        <div className="p-item">
          <h5>华为 2014.12 - 2017.12</h5>
          <p>
            交付内部多个 MIS 项目，参与公司变革项目前端开发与技术预研，参与华为公有云产品开发。 
          </p>
          <p>受 Scrum 敏捷管理等技能培训，担任部门总体技术组的执行秘书，组织会议、技术分享、讨论等活动。</p>
          <div className="project-type">平台项目</div>
          <ul>
            <li>
              <p>
                <b><a href="http://www.huaweicloud.com/appbuilder/">AppBuilder</a></b>：应用开发工厂是一个采用图形化布局、拖拉拽操作、配置化设置，通过对大量可复用的应用元数据（如UI、模板、逻辑等）采用积木式组装，实现快速、高效构建应用的在线开发平台。<br/>
                参与了其中 web 构建器的开发工作，搭建项目，编写 <b>WebPack</b> 构建配置，独立完成了 Web 构建器公有云版从设计到 Demo 的实现，完成了基于元数据渲染页面的技术实现，引入了开源代码提升开发效率，带领新人开发组件，
                主要涉及技术有 <b>Vue.js、WebPack、IView</b> 等前端工具及开源库。
              </p>
            </li>
            <li>
              <p>
                <b>某内部变革项目：</b>该系统支撑公司内部业务流程端到端打通，支撑华为运营商业务，支撑产品配置与报价。<br/>参与系统的前后端开发工作，前端使用 webix 框架，参与了前端配置引擎的预研开发工作，期间学习了规则引擎原理和相关的算法，开发了一个在前端编写规则进行产品配置的 Demo。
              </p>
            </li>
            <li>
              <p>
              <b>某内部页面构建平台：</b>基于卡片概念创建 portal 页面的应用，用户可以按照开发规范开发卡片，上传至卡片市场，使用时从卡片市场中拖拽卡片至布局管理器从而构建 portal 页面。<br/>
                主要涉及开发技术有 <b>React.js、Redux、 React-Router，</b>参与了卡片市场的前端开发工作，搭建项目脚手架，引入开源代码，参与卡片开发规范制定，解决了卡片远程动态加载等技术问题。
              </p>
            </li>
          </ul>
          <div className="project-type">管理信息系统项目</div>
          <ul>
            <li>
              <p><b>内部某信息管理系统：</b>完成开发交付，该工具系统承载服务类基础数据，提供服务鉴权查询、支撑存量经营、订单履行。<br/>承担了部分面向公司内部的页面开发工作，独立完成华为企业服务微信公众号上维保查询功能的前后端开发，主要涉及技术 JQuery、Amaze UI。</p>
            </li>
            <li>
              <p><b>某研发物料管理的系统：</b>该系统采用账目数据为中心的设计，交付极大提高物料获取效率和利用率，且能及时发现异常。<br/>在该系统交付过程中做了部分前端页面开发工作，涉及技术有JQuery，Echarts用于呈现账目报表，使用 ES6 的新语法特性处理大量报表数据并发加载的问题。 </p>
            </li>
          </ul>
        </div>
        <div className="p-item">
          <h5>Anker 2018.3 - 2018.10（实习）</h5>
          <p>维护公司内部的售后邮箱管理系统，处理一些简单需求和 BUG 单，学习了基于 <b>Git</b> 版本控制系统的团队协作，以及如何阅读和修改大型开源 PHP 系统代码。</p>
        </div>
      </section>
      <section className="other-experience">
        <ul>
          <li>十六届 D2 前端技术大会 演讲嘉宾</li>
          <li>GGEditor 图编辑器开源项目开发者</li>
          <li>阿里巴巴 FAST 天文台寻星公益项目开发者</li>
          <li>阿里巴巴 CCO 黑客马拉松连续参与者-四等奖</li>
          <li>在华为期间 华为首届黑客马拉松二等奖，华为明日之星奖</li>
          <li>在校期间 自学清华大学 MOOC 课程《数据结构》通过考试取得证书</li>
        </ul>
      </section>
    </div>
  )
}