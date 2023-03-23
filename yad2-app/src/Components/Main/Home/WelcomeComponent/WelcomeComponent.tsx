import "./WelcomeComponent.css";
import vectorHome from "../../../../images/vectorHome.png";
import BarChart from "../../../BarChart/BarChart";
import PieChart from "../../../BarChart/PieChart";

const data = [
  { label: "Furniture", value: 142 },
  { label: "Beauty Care", value: 35 },
  { label: "Electronics", value: 58 },
  { label: "Clothing", value: 41 },
];

const App: React.FC = () => {
  return <PieChart data={data} width={400} height={400} />;
};

function WelcomeComponent(): JSX.Element {
  return (
    <div className="WelcomeComponent">
      <div className="WelcomeComponentSen">
        <h2>Reusful, Buy and Sell Reusful stuff.</h2>
        <span>
          Score a deal and save a bundle with our website! Find gently used
          clothes, furniture, electronics, and more at a fraction of the cost.
          Shop unique collectibles and rare finds.{" "}
        </span>
        <span id="WelcomeComponentSenCatchPhrase">
          Shop with confidence at our website.
        </span>
      </div>
      <div className="wrap-charts">
        <div className="WelcomeComponentChart">
          <h3>Today's Product by Category</h3>
          <BarChart />
        </div>
        <div className="WelcomeComponentChart">
          <h3>Categories Average Price</h3>
          <div className="pie-chart">
            <App />
          </div>
        </div>
      </div>
    </div>
  );
}

export default WelcomeComponent;
