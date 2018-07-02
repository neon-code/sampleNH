import React from 'react';
import '../CSS/primary.css';
import { Button, Image, Icon, Label, Header, Modal } from 'semantic-ui-react';

var fileDir = [
    { fileName: './50images/n01514668_80.JPEG', id: "n01514668" },
{ fileName: './50images/n01608432_373.JPEG', id: "n01608432" },
{ fileName: './50images/n01644900_267.JPEG', id: "n01644900" },
{ fileName: './50images/n01688243_23.JPEG', id: "n01688243" },
{ fileName: './50images/n01728572_402.JPEG', id: "n01728572" },
{ fileName: './50images/n01728920_158.JPEG', id: "n01728920" },
{ fileName: './50images/n01748264_23.JPEG', id: "n01748264" },
{ fileName: './50images/n01776313_134.JPEG', id: "n01776313" },
{ fileName: './50images/n01843383_211.JPEG', id: "n01843383" },
{ fileName: './50images/n01883070_131.JPEG', id: "n01883070" },
{ fileName: './50images/n02002556_33.JPEG', id: "n02002556" },
{ fileName: './50images/n02027492_135.JPEG', id: "n02027492" },
{ fileName: './50images/n02088364_521.JPEG', id: "n02088364" },
{ fileName: './50images/n02093256_4360.JPEG', id: "n02093256" },
{ fileName: './50images/n02100583_12424.JPEG', id: "n02100583" },
{ fileName: './50images/n02100735_8318.JPEG', id: "n02100735" },
{ fileName: './50images/n02110341_10375.JPEG', id: "n02110341" },
{ fileName: './50images/n02123597_56.JPEG', id: "n02123597" },
{ fileName: './50images/n02169497_36.JPEG', id: "n02169497" },
{ fileName: './50images/n02229544_1176.JPEG', id: "n02229544" },
{ fileName: './50images/n02229544_438.JPEG', id: "n02229544" },
{ fileName: './50images/n02268443_50.JPEG', id: "n02268443" },
{ fileName: './50images/n02326432_163.JPEG', id: "n02326432" },
{ fileName: './50images/n02363005_503.JPEG', id: "n02363005" },
{ fileName: './50images/n02457408_414.JPEG', id: "n02457408" },
{ fileName: './50images/n02666196_88.JPEG', id: "n02666196" },
{ fileName: './50images/n02788148_293.JPEG', id: "n02788148" },
{ fileName: './50images/n02825657_329.JPEG', id: "n02825657" },
{ fileName: './50images/n02892767_737.JPEG', id: "n02892767" },
{ fileName: './50images/n02963159_12.JPEG', id: "n02963159" },
{ fileName: './50images/n02966687_157.JPEG', id: "n02966687" },
{ fileName: './50images/n03041632_120.JPEG', id: "n03041632" },
{ fileName: './50images/n03124170_150.JPEG', id: "n03124170" },
{ fileName: './50images/n03220513_302.JPEG', id: "n03220513" },
{ fileName: './50images/n03384352_234.JPEG', id: "n03384352" },
{ fileName: './50images/n03388183_19.JPEG', id: "n03388183" },
{ fileName: './50images/n03450230_613.JPEG', id: "n03450230" },
{ fileName: './50images/n03584829_464.JPEG', id: "n03584829" },
{ fileName: './50images/n03657121_290.JPEG', id: "n03657121" },
{ fileName: './50images/n03680355_110.JPEG', id: "n03680355" },
{ fileName: './50images/n03690938_31.JPEG', id: "n03690938" },
{ fileName: './50images/n03770679_83.JPEG', id: "n03770679" },
{ fileName: './50images/n03794056_23.JPEG', id: "n03794056" },
{ fileName: './50images/n03899768_323.JPEG', id: "n03899768" },
{ fileName: './50images/n03992509_67.JPEG', id: "n03992509" },
{ fileName: './50images/n03995372_197.JPEG', id: "n03995372" },
{ fileName: './50images/n04146614_363.JPEG', id: "n04146614" },
{ fileName: './50images/n04266014_6.JPEG', id: "n04266014" },
{ fileName: './50images/n04428191_752.JPEG', id: "n04428191" },
{ fileName: './50images/n04548280_2.JPEG', id: "n04548280" },
]

var activeIndex = Math.floor(Math.random() * 50), usedImages = [activeIndex], taskDone = 1, flag;
var timeTaken = { minutes: 0, seconds: 0, milsec: 0 }, addTime = [0, 0, 0], avgTime = [], Interval;
var fileName = fileDir[activeIndex].fileName;

export class MainImages extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isopen: false,
            activeNext: false
        };
    }

    componentDidMount() {
        alert("* Please disable AdBlock and any other antivirus software before you begin!\n Make sure to \"Allow\" popups/cookies on this app! *");
        this.props.onRef(this)
    }

    updateButton() {
        this.state.activeNext ? this.setState({ activeNext: false }) : this.setState({ activeNext: true })
    }

    OnFinish() {
        //To find the Average time
        let td = taskDone - 1;
        avgTime[0] = addTime[0] / td;
        avgTime[1] = addTime[1] / td;
        avgTime[2] = addTime[2] / td;

        avgTime[1] += (avgTime[0] * 60) % 60;
        avgTime[2] += (avgTime[1] * 100) % 100;

        avgTime[0] = Math.floor(avgTime[0]);
        avgTime[1] = Math.floor(avgTime[1]);
        avgTime[2] = Math.floor(avgTime[2]);

        this.props.onFinish(addTime, avgTime);
    }

    startTimer() {
        timeTaken.milsec++;

        if (timeTaken.milsec > 99) {
            timeTaken.seconds++;
            timeTaken.milsec = 0;
        }

        if (timeTaken.seconds > 59) {
            timeTaken.minutes++;
            timeTaken.seconds = 0;
        }
    }

    startWatch() {
        Interval = setInterval(this.startTimer, 10);
    }

    changeImage() {
        //Pause the StopWatch
        clearInterval(Interval);
        this.updateButton();

        //To pass values to Parent (App.js);
        let t = timeTaken.minutes + ":" + timeTaken.seconds + ":" + timeTaken.milsec;
        this.props.onNextImage(fileDir[activeIndex].fileName, fileDir[activeIndex].id, t);

        //Add the time to find total time take
        addTime[2] += timeTaken.milsec;
        if (addTime[2] > 99) {
            addTime[1] += Math.floor(addTime[2] / 100);
            addTime[2] %= 100;
        }
        addTime[1] += timeTaken.seconds;
        if (addTime[1] > 59) {
            addTime[0] += Math.floor(addTime[1] / 60);
            addTime[1] %= 60;
        }
        addTime[0] += timeTaken.minutes;
        
        //Clear the StopWatch
        timeTaken.milsec = timeTaken.seconds = timeTaken.minutes = 0;

        //Load next image
        taskDone++;
        //Change here to lock the images
        if (taskDone > 50) {
            this.setState({
                isopen: true
            })
        }
        else
            do {
                flag = true;
                activeIndex = Math.floor(Math.random() * 50);

                for (var i = 0; i < usedImages.length; i++)
                    if (usedImages[i] === activeIndex)
                        flag = false;

                if (flag === true) {
                    usedImages.push(activeIndex);
                    fileName= fileDir[activeIndex].fileName;
                }
            } while (flag !== true);

        //Start the Watch
        this.startWatch();
    }

    render() {
        return (
            <div>
                <Image className="imageStyling" src={fileName} />

                <Label style={{ zIndex: "1", position: "fixed", top: "10px", right: '4vw' }} color="teal">
                    {taskDone}/50
                </Label>

                <div className="NextButton" style={{ width: '180px' }} >
                    {this.state.activeNext ?
                        <Button primary animated size='huge' onClick={this.changeImage.bind(this)}>
                            <Button.Content visible> Next Image </Button.Content>
                            <Button.Content hidden>
                                <Icon name='right arrow' />
                            </Button.Content>
                        </Button>
                        :
                        <Button disabled size='huge'>Next Image</Button>
                    }
                </div>

                <Modal open={this.state.isopen} basic dimmer="blurring" style={{ position: "fixed", width: "auto", marginTop: "30vh", marginLeft: "38vw" }}>
                    <Header icon='check square outline' style={{ textAlign: "center" }} content='Task Completed!' />
                    <Modal.Content>
                        <h2> Thank you for your participation! <br />
                            Please click on Finish. </h2>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color='blue' inverted onClick={this.OnFinish.bind(this)}>
                            Finish
                        </Button>
                    </Modal.Actions>
                </Modal>
            </div>
        );
    }
}