import './styles.less';

export default () => {
  return (
    <div className="resume">
      <h1>软件开发工程师-前端/全栈</h1>
      <section className="info">
        <span>李志成</span>
        <span>男</span>
        <span>本科</span>
        <span>17603050797</span>
        <span>zack@ksana.net</span>
        <span><a href="https://ksana.net">https://ksana.net</a></span>
      </section>
      <section className="tech">
          <p>JavaScript/Typescript</p>
          <p>React/Vue/Webpack/Vite/WebAssembly/…</p>
          <p>Rust/Go/…</p>
          <p>Node.js/Deno/…</p>
      </section>
      <section className="career">
        <h5>2014.7 - 2023.5 7+ 年</h5>
        <p>
          <span>阿里巴巴（高级前端工程师） 2018.10 - 至今</span>
        </p> 
        <p>
          <span>蜂投网（前端技术主管，带 12 人团队）2018.3 - 2018.10</span>
        </p>
        <p>
          <span>华为技术有限公司 2014.12 - 2017.12</span>
        </p>
        <p>
          <span>Anker 2014.7 - 2014.9（实习）</span>
        </p>
      </section>
      <section className="company-experience">
        <div className="p-item">
          <h3>阿里巴巴 （高级前端工程师） 2018.10 - 至今</h3>
          <li>阿里巴巴 阿里云 藏经阁前端技术分享会 组织成员，负责技术分享内容收集，线上技术分享活动组织</li>
          <li>阿里巴巴 负责招聘、技术氛围营造、技术分享活动组织与策划</li>
        </div>
        <div className="p-item">
          <h3>蜂投网（前端技术主管 12 人团队）2018.3 - 2018.10</h3>
          <p>负责公司手机 APP（Hybrid App）首页、活动页、后台管理系统等前端部分开发与管理，前端技术方案选型、招聘新人与绩效考核。</p>
          <p>作为前端 Leader 为团队答疑解惑救火，营造技术氛围，帮助团队成员解决技术难题，作为火车头牵引团队高效、高质量交付前端需求。</p>
          <p>负责前端工作内容的分工与协作，支撑公司前端研发任务（日常活动页、App 研发、问题处理）</p>
          <p>负责新应用 壹诺信用 的技术选型与研发（React Native）</p>
        </div>
        <div className="p-item">
          <h3>华为 2014.12 - 2017.12</h3>
          <p>
            交付内部多个 MIS 项目，参与公司变革项目前端开发与技术预研，参与华为公有云产品开发。 
          </p>
          <p>受 Scrum 敏捷管理等技能培训，担任部门总体技术组的执行秘书，组织会议、技术分享、讨论等活动。</p>
          <ol>
            <h5>平台类项目</h5>
            <li>某内部变革项目：该系统支撑公司内部业务流程端到端打通，支撑华为运营商业务，支撑产品配置与报价。<br/>参与系统的前后端开发工作，前端使用 webix 框架，参与了前端配置引擎的预研开发工作，期间学习了规则引擎原理和相关的算法，开发了一个在前端编写规则进行产品配置的 Demo。</li>
            <li>某内部页面构建平台：基于卡片概念创建 portal 页面的应用，用户可以按照开发规范开发卡片，上传至卡片市场，使用时从卡片市场中拖拽卡片至布局管理器从而构建 portal 页面。<br/>
              主要涉及开发技术有 <strong>React.js、Redux、 React-Router，</strong>参与了卡片市场的前端开发工作，搭建项目脚手架，引入开源代码，参与卡片开发规范制定，解决了卡片远程动态加载等技术问题。
            </li>
            <li><strong><a href="http://www.huaweicloud.com/appbuilder/">AppBuilder</a></strong>：应用开发工厂是一个采用图形化布局、拖拉拽操作、配置化设置，通过对大量可复用的应用元数据（如UI、模板、逻辑等）采用积木式组装，实现快速、高效构建应用的在线开发平台。<br/>
              参与了其中 web 构建器的开发工作，搭建项目，编写 <strong>WebPack</strong> 构建配置，独立完成了 Web 构建器公有云版从设计到 Demo 的实现，完成了基于元数据渲染页面的技术实现，引入了开源代码提升开发效率，带领新人开发组件，
              主要涉及技术有 <strong>Vue.js、WebPack、IView</strong> 等前端工具及开源库。
            </li>
            <h5>管理信息系统项目</h5>
            <li>完成华为内部某信息管理系统的开发交付，该工具系统承载服务类基础数据，提供服务鉴权查询、支撑存量经营、订单履行。<br/>承担了部分面向公司内部的页面开发工作，
            独立完成华为企业服务微信公众号上维保查询功能的前后端开发，主要涉及技术 JQuery、Amaze UI。
            </li>
            <li>某研发物料管理的系统，该系统采用账目数据为中心的设计，交付极大提高物料获取效率和利用率，且能及时发现异常。<br/>在该系统交付过程中做了部分前端页面开发工作，涉及技术有JQuery，Echarts用于呈现账目报表，
              使用 ES6 的新语法特性处理大量报表数据并发加载的问题。 
            </li>
          </ol>
        </div>
        <div className="p-item">
          <h3>Anker 2018.3 - 2018.10（实习）</h3>
          <p>维护公司内部的售后邮箱管理系统，处理一些简单需求和 BUG 单，学习了基于 <strong>Git</strong> 版本控制系统的团队协作，以及如何阅读和修改大型开源 PHP 系统代码。</p>
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