import { Card, CardContent, CardHeader } from "@mui/material";
import '../css/Dashboard.css'

const Dashboard = () => (
    <Card>
        <CardHeader title="Celebrity Face Recognition" />
        <CardContent>Here we will find the time that celebrities spend on tv shows</CardContent>
        <div>
        <iframe src="https://charts.mongodb.com/charts-project-0-dkebfip/embed/charts?id=662bc7c3-afb5-4751-89e8-ee72b17ba6b9&maxDataAge=3600&theme=light&autoRefresh=true" 
        className="thirdChart iframeStyle"></iframe>
        <iframe src="https://charts.mongodb.com/charts-project-0-dkebfip/embed/charts?id=662bc948-3906-49d2-81a8-7cfdb465f0da&maxDataAge=3600&theme=light&autoRefresh=true" 
        className="thirdChart iframeStyle"></iframe>
        <iframe src="https://charts.mongodb.com/charts-project-0-dkebfip/embed/charts?id=662bca26-f99a-48f3-8419-e30a4b645533&maxDataAge=3600&theme=light&autoRefresh=true"
        className="thirdChart iframeStyle"></iframe>
        </div>
        <iframe src="https://charts.mongodb.com/charts-project-0-dkebfip/embed/charts?id=662fa82a-d41d-4ba4-8f0a-6bf60d24f98d&maxDataAge=3600&theme=light&autoRefresh=true" 
        className="firstChart iframeStyle"></iframe>
        <iframe src="https://charts.mongodb.com/charts-project-0-dkebfip/embed/charts?id=662fb00f-c731-4f38-81e7-520157a0d4d8&maxDataAge=3600&theme=light&autoRefresh=true" 
        className="secondChart iframeStyle"></iframe>
        <div>
        <iframe src="https://charts.mongodb.com/charts-project-0-dkebfip/embed/charts?id=662fb18c-d41d-4e37-8a01-6bf60df01eb1&maxDataAge=3600&theme=light&autoRefresh=true" 
        className="secondChart table"></iframe>
        </div>
    </Card>
);

export default Dashboard;