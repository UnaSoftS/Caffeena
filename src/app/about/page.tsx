import AboutUs from "@/components/aboutus";
import FeaturesHeader from "@/components/header/featuresheader";

export default function AboutPage(){
    return(
        <div>
<FeaturesHeader title="About Us" 
        subtitle="Our Story" 
        background="/images/image4.jpg" />
            <AboutUs/>
        </div>
    )
}