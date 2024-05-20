import { Card, CardContent, CardHeader } from "@mui/material";
import '../css/Dashboard.css'

const Dashboard = () => (
    <Card>
        <CardHeader title="Celebrity Face Recognition" />
        <CardContent>Here we will find the time that celebrities spend on tv shows</CardContent>
        <div>
        {/* <iframe src="https://charts.mongodb.com/charts-project-0-dkebfip/embed/charts?id=662bc7c3-afb5-4751-89e8-ee72b17ba6b9&maxDataAge=3600&theme=light&autoRefresh=true" 
        className="thirdChart iframeStyle"></iframe> */}
        <iframe src="https://charts.mongodb.com/charts-hottelio-minxu/embed/charts?id=664753b1-b61f-419f-8fb9-22cbab476404&maxDataAge=3600&theme=light&autoRefresh=true" 
        className="thirdChart iframeStyle"></iframe>
        <iframe src="https://charts.mongodb.com/charts-hottelio-minxu/embed/charts?id=664753b1-b61f-48cb-80a4-22cbab476406&maxDataAge=3600&theme=light&autoRefresh=true"
        className="thirdChart iframeStyle"></iframe>
        </div>
        <div>
        <iframe src="https://charts.mongodb.com/charts-hottelio-minxu/embed/charts?id=664753b1-b61f-4fe3-840a-22cbab47640a&maxDataAge=3600&theme=light&autoRefresh=true"
        className="firstChart iframeStyle"></iframe>
        <iframe src="https://charts.mongodb.com/charts-hottelio-minxu/embed/charts?id=664753b1-b61f-4dd4-8e1a-22cbab47640c&maxDataAge=3600&theme=light&autoRefresh=true" 
        className="secondChart iframeStyle"></iframe>
        </div>
        <div>
        <iframe src="https://charts.mongodb.com/charts-hottelio-minxu/embed/charts?id=664753b1-b61f-4428-8baa-22cbab476420&maxDataAge=3600&theme=light&autoRefresh=true"
        className="firstChart iframeStyle"></iframe>
        <iframe src="https://charts.mongodb.com/charts-hottelio-minxu/embed/charts?id=664753b1-b61f-4fd4-8589-22cbab4763fe&maxDataAge=3600&theme=light&autoRefresh=true"
        className="secondChart iframeStyle"></iframe>
        </div>
        <div>
        <iframe src="https://charts.mongodb.com/charts-hottelio-minxu/embed/charts?id=664753b1-b61f-4bcd-826c-22cbab47640e&maxDataAge=3600&theme=light&autoRefresh=true" 
        className="secondChart table"></iframe>
        </div>
    </Card>
);

export default Dashboard;