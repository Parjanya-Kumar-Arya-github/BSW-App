import React from 'react';
import ResourcePageTemplate from '../Components/ResourcePageTemplate';
import { FaLaptopCode, FaWindows, FaLinux } from 'react-icons/fa';

const Softwares = () => {
    const resources = [
        {
            title: "MATLAB",
            description: "Interactive platform for numerical computation and data visualization. Available for Windows, Linux, Mac.",
            link: "http://repo.iitd.ernet.in/matlab/",
            category: "Scientific Computing",
            icon: FaLaptopCode
        },
        {
            title: "Ubuntu",
            description: "Linux distribution based on Debian. Free and open source.",
            link: "http://repo.iitd.ernet.in/ubuntu-releases/",
            category: "Operating Systems",
            icon: FaLinux
        },
        {
            title: "Windows Activation",
            description: "KMS Activation info for Windows provided by IIT Delhi.",
            link: "https://kmsproxy.iitd.ac.in/kms.html",
            category: "Operating Systems",
            icon: FaWindows
        },
        {
            title: "Microsoft Office 365",
            description: "Installation procedure for Microsoft Office 365.",
            link: "http://www.cc.iitd.ernet.in/CSC/index.php?option=com_content&view=article&id=161",
            category: "Productivty",
            icon: FaWindows
        },
        {
            title: "Windows Update Service",
            description: "WSUS infrastructure to conserve Internet Bandwidth.",
            link: "http://www.cc.iitd.ernet.in/CSC/index.php?option=com_content&view=article&id=83",
            category: "Services",
            icon: FaWindows
        },
        {
            title: "Dreamspark Software",
            description: "SDKs for Kinect, Windows phone etc.",
            link: "http://repo.iitd.ernet.in/winsoft",
            category: "Development",
            icon: FaLaptopCode
        }
    ];

    return (
        <ResourcePageTemplate
            title="Softwares"
            description="A list of softwares available for IIT Delhi students, including operating systems, scientific tools, and development kits."
            resources={resources}
        />
    );
};

export default Softwares;
