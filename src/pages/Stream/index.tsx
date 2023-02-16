import useStreamModel from "./model";
import "./style.less";

export default () => {
    const { events } = useStreamModel();

    return <div>hello world</div>;
};
