import Guide from '@/components/Guide';
import './about.less'

const About = () => (
    <div className="about">
        <Guide />
        <p>
            <a style={{ textDecoration: 'underline' }} href="https://github.com/lzcers">
                My GitHub
            </a>
        </p>
        <i>lzcers@gmail.com</i>
    </div >
)

export default About
