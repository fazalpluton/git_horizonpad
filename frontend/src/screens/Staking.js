import React, { useEffect, useState } from "react";
import { Container, Row, Col, InputGroup,DropdownButton,Dropdown,FormControl,Form ,Button, Modal } from "react-bootstrap";
import IdoBox from "../components/ido-box"
import BannerImage from "../assets/images/ido-banner-main.png"
import checkpoint from "../assets/images/checkpoint.png";
import confirm from "../assets/images/confirm.png";
import confirmation from "../assets/images/confirmation.png";
import preauth from "../assets/images/pre-auth.png";
import amountstack from "../assets/images/amountstack.png";
import warning from "../assets/images/warning.png";
import checklist from "../assets/images/checklist.png";
import warningyellow from "../assets/images/warning-yellow.png"
import { Link } from "react-router-dom";
// import detectEthereumProvider from '@metamask/detect-provider'
import { ethers, BigNumber } from 'ethers'
import StakingAbi from "../contract/Staking.json"
import ZPadAbi from "../contract/ZPad.json"
import {staking_addr, zpad_addr, rewardToken_addr} from "../contract/addresses"
import Web3Modal from 'web3modal'
import { useWeb3React } from "@web3-react/core";
import detectEthereumProvider from '@metamask/detect-provider'







function Stacking(props){

    const {
        connector,
        library,
        account,
        chainId,
        activate,
        deactivate,
        active,
        errorWeb3Modal
    } = useWeb3React();

    const [stakevalue,setStakevalue] = useState(0);
    const [unStakeValue, setUnStakeValue] = useState(0)
    const [staketype,setStaketype] = useState('stake');
    const [totalToken, setTotalToken] = useState()
    const [totalbalance, setTotalBalance] = useState(0)
    const [stakersNo, setStakersNo] = useState(0)
    const [userApy, setUserApy] = useState("40%")
    const [userReward, setUserReward] = useState(0)
    const [userUnstakedValue, setUserUnstakedValue] = useState(0)
    const [authorization, setAuthorization] = useState("")
    const [Confirmation, setConfirmation] = useState("")
    const [confirmed, setConfirmed] = useState("")


    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [show1, setShow1] = useState(false)
    const handleClose1 = () => setShow1(false);
    const handleShow1 = () => setShow1(true);
    const [error, setError] = useState()
    const [msgHandling, setMsgHandling] = useState()
    
    const [bronze, setBronze] = useState(0)
    const [silver, setSilver] = useState(0)
    const [gold, setGold] = useState(0)
    const [tokenError, setTokenError]= useState()
    const [mystate,setMystate] = useState(0);
    // fazal 
    const [isType,setIsType]= useState('withdraw')

    const loadProvider = async () => {
        try {
            const web3Modal = new Web3Modal();
            const connection = await web3Modal.connect();
            const provider = new ethers.providers.Web3Provider(connection);
            return provider.getSigner();
          } catch (e) {
            console.log("loadProvider default: ", e);
          }
      };



    //   const loadSigner = async () => {
    //     try {
    //       const provider = new ethers.providers.Web3Provider(window.ethereum)
    //       return provider
    //     } catch (e) {
    //       console.log("loadProvider: ", e);
    //     }
    //   };
    
      const loadTotalStake = async () => {
        try{
            let signer = await loadProvider()
            // console.log("signer", signer)
            let stakingContract = new ethers.Contract(staking_addr, StakingAbi, signer)
            let totalStakedValue = await stakingContract.totalStakedValue()
           
           // let decimalsUnit = await stakingContract._ether();
            let token = await ethers.utils.formatUnits(totalStakedValue.toString(),4)
            setTotalToken(token)
            // console.log(token)
        }catch(e){
            console.log(e)
        }
        }

        // console.log("totalToken", parseInt(totalToken).toString())

        // function to insert token to the smart contract
        const Stake = async () => {
            try{
                setAuthorization("Pre-authorization")
                let signer = await loadProvider()
                let stakingContract = new ethers.Contract(staking_addr, StakingAbi, signer)
                let getBronze = await stakingContract.bronze()
                let ZPadContract = new ethers.Contract(zpad_addr, ZPadAbi, signer)
                let allowanceCheck = await ZPadContract.allowance(account, staking_addr)
                
                let decimalsUnit = await ZPadContract.decimals();
                let _value = await ethers.utils.parseUnits(stakevalue,decimalsUnit)
                // console.log("allowanceCheck", allowanceCheck)
                // console.log("getBronze", getBronze.toString())
                if(allowanceCheck.toString() < getBronze){
                    // console.log("allounceCheck>>", allowanceCheck)
                    setConfirmation("Confirmation")
                    let approve = await ZPadContract.approve(staking_addr, _value)
                    let approveTx = await approve.wait()
                    // console.log("approveTx>", approveTx)
                    if(approveTx && approveTx.blockNumber){
                        setMystate(stakevalue)
                        setMsgHandling("Staking")
                        let stake = await stakingContract.stake(ethers.utils.parseUnits(stakevalue,decimalsUnit))
                        let tx = await stake.wait()
                        // console.log("tx1", tx)
                        setConfirmed("Confirmed")
                        // totalBalance()
                        setStakevalue(0)
                        Stakers()
                        loadTotalStake()

                    }
                    else{
                        console.log("error")
                    }
                }else{
                    // console.log("errorr")
                    setConfirmation("Confirmation")
                    setMsgHandling("Staking")
                        let stake = await stakingContract.stake(ethers.utils.parseUnits(stakevalue,decimalsUnit))
                        let tx = await stake.wait()
                        // console.log("tx2", tx)
                        setConfirmed("Confirmed")
                        setStakevalue(0)
                        Stakers()
                        loadTotalStake()

                }
                
            }
            catch(e){
                setMsgHandling(e)
                // handleShow()
                handleShow1()
                setError(1)
                // console.log("error: ",e)
            }
        }

        // console.log("msgHandling", msgHandling)

        
        // let short = msgHandling.slice(0, 20)+"..." + msgHandling.slice(len-5, len-1)
        // console.log("short", short)

        // console.log("bronze", msgHandling)

        // This function is used to call Stake function
        const Staking = (event) => {
            Stake()
            event.preventDefault()
        }

        

        // This Function is used to lock Maximum Token

        const MaxStake = async () => {
            try{
              let signer = await loadProvider()
              let ZPadContract = new ethers.Contract(zpad_addr, ZPadAbi, signer)
              let balanceOf = await ZPadContract.balanceOf(account)
              let decimalsUnit = await ZPadContract.decimals();
              let token = await ethers.utils.formatUnits(balanceOf.toString(),decimalsUnit)
              
            //   console.log("token", token)
              setStakevalue(parseInt(token).toString())
              // console.log("balance>>",  token)
            }
            catch(error){
                console.log(error)
            }
             
          }

        // This Function is used for unStake Token from SmartToken

        const unStake = async () => {
            try{
                
                let signer = await loadProvider()
                let stakingContract = new ethers.Contract(staking_addr, StakingAbi, signer)
                let token = await ethers.utils.parseUnits((unStakeValue).toString(),4)
                
                // console.log(token)
                let unStake = await stakingContract.unStake(token)
                // console.log("unStake>>>>>>>>>>", unStake)
                setAuthorization("Unstake")
                let tx = await unStake.wait()
                setConfirmed("Unstake_Confirmed")
                setUnStakeValue(0)
            }
            catch(e){
                console.log(e)
            }
        }
        
        // console.log("unStakeValue", unStakeValue)

        const MaxUnStake = async () => {
            try{
                let signer = await loadProvider()
                let stakingContract = new ethers.Contract(staking_addr, StakingAbi, signer)
             //   let ZPadContract = new ethers.Contract(zpad_addr, ZPadAbi, signer)
            //   let decimalsUnit = await ZPadContract.decimals();
            //   console.log("decimalsUnit", decimalsUnit)
                let getUserStakedValue = await stakingContract.getUserStakedValue(account)
                let token = await ethers.utils.formatUnits(getUserStakedValue.toString(),4)
                // console.log("token>>", token)
                setUnStakeValue(parseInt(token).toString())
                // setUnStakeValue(Math.floor(token))

            //     let ZPadContract = new ethers.Contract(zpad_addr, ZPadAbi, signer)
            //   let balanceOf = await ZPadContract.balanceOf(account)
            //   let decimalsUnit = await ZPadContract.decimals();
            //   let token = await ethers.utils.formatUnits(balanceOf.toString(),decimalsUnit)
            }
            catch(e){
                console.log(e)
            }
        }

        const unStaking = (event) => {
            unStake()
            event.preventDefault()
        }

        // This function is used to get unStaked Value

        const getUnstakedValue = async () => {
            try{
                let signer = await loadProvider()
                let stakingContract = new ethers.Contract(staking_addr, StakingAbi, signer)
                let getUserStakedValue = await stakingContract.getUnstakedValue(account)
               // let token = ethers.utils.formatEther(getUserStakedValue.toString())
                let token = await ethers.utils.formatUnits(getUserStakedValue.toString(),4)
                setUserUnstakedValue(token)
                // console.log(getUserStakedValue.toString())
            }
            catch(e){
                console.log(e)
            }
        }
        // console.log("userUnstakedValue",userUnstakedValue)


        // This is functrion is used for pull Rewards
        const Reward = async () => {
            try{
                let signer = await loadProvider()
                let stakingContract = new ethers.Contract(staking_addr, StakingAbi, signer)
                setAuthorization("Withdraw")
                if(totalbalance == 0){
                    return
                }
                else{
                    let withdrawRewards = await stakingContract.withdrawRewards()
                    await withdrawRewards.wait()
                    setConfirmed("Withdraw_Confirmed")
                // console.log("withdrawRewards", withdrawRewards)
    
                }
                
            }
            catch(e) {
                console.log(e)
            }
        }

        // This function is used for Claculate Panding Reward
        const calcPendingReward = async () => {
            try{
                let signer = await loadProvider()
            let stakingContract = new ethers.Contract(staking_addr, StakingAbi, signer)
            let calcPendingRewards = await stakingContract.showPendingRewards(account)
            setUserReward(calcPendingRewards.toString())
            // console.log("userReward", calcPendingRewards.toString())
            }
            catch(e){
                console.log(e)
            }
        } 
        calcPendingReward()



        // This function is used to get all token to the user
        const totalBalance = async () => {
            try{
                // console.log("token>>")
                let signer = await loadProvider()
                let stakingContract = new ethers.Contract(staking_addr, StakingAbi, signer)
                let getUserStakedValue = await stakingContract.getUserStakedValue(account)
               // let token = ethers.utils.formatEther(getUserStakedValue.toString())
                let token = await ethers.utils.formatUnits(getUserStakedValue.toString(),4)
                setTotalBalance(token)
                // console.log("getUserStakedValue", token)
            } 
            catch(e){
                console.log(e)
            }
        }

        // This Function is used to get staking and unstaking Events from smart contract

        const Event = async () => {
            try{
                let signer = await loadProvider()
                let stakingContract = new ethers.Contract(staking_addr, StakingAbi, signer)
                  stakingContract.on("eve_staked", (amount) => {
                    
                    loadTotalStake()
                    totalBalance()
                }
                ) 
                stakingContract.on("eve_Unstaked", (amount) => {
                  
                    loadTotalStake()
                    totalBalance()
                    getUnstakedValue()
                    
                    // console.log("amount>>", amount.toString())
                }
                ) 
            }
            catch(e){
                console.log(e)
            }
        }

        // This Function is Used For No Of Stakers

        const Stakers = async () => {
            try{
                let signer = await loadProvider()
                let stakingContract = new ethers.Contract(staking_addr, StakingAbi, signer)
                let staker = await stakingContract.noOfStakers()
    
                if(staker <=0 ){
                    setStakersNo("NA")
                }
                else{
    
                    setStakersNo(staker.toString())
                }
                // console.log("getAPY", staker.toString())
            }
            catch(e){
                console.log(e)
            }
           
            // setStakersNo(staker.toString())
            // if(stakersNo == null || 0) {
            //     setStakersNo("hjhj")
            // }
            // console.log("staker", staker.toString())
        }

        // const APY = async () => {
        //     let signer = await loadProvider()
        //     let stakingContract = new ethers.Contract(staking_addr, StakingAbi, signer)
        //     let getAPY = await stakingContract.getAPY()
        //     if(getAPY <=0 ){
        //         setUserApy("NA")
        //     }
        //     else{

        //         setUserApy(getAPY.toString())
        //     }
        //     console.log("getAPY", getAPY.toString())
        // }
        // Stakers()

        const Tiers = async () => {
           try{
            let signer = await loadProvider()
            let stakingContract = new ethers.Contract(staking_addr, StakingAbi, signer)
            let bronze = await stakingContract.bronze()
            setBronze(Math.floor(ethers.utils.formatEther(bronze.toString())))
           }
           catch(e){
               console.log(e)
           }
        }
        

        useEffect(() => {
            (async () => {
                if (account) {
                    try {
                        // loadTotalStake()
                        Event()
                        totalBalance()
                        getUnstakedValue()
                        loadTotalStake()
                        Stakers()
                        Tiers()
                        // Stakers()
    
                    } catch (error) {
                        console.log(error)
                    }
                }
            })()
        }, [account]);

        // useEffect(() => {
        //     (async () => {
                
        //             try {
        //                 loadTotalStake()
        //                 Stakers()
        //                 Tiers()
        //             } catch (error) {
        //                 console.log(error)
        //             }
                
        //     })()
        // }, []);
        
        useEffect(() => {
            (async () => {
                if (account && totalbalance > 0) {
                    try {
                        const interval = setInterval(() => {
                                calcPendingReward();
                                // console.log("hhh")
                              }, 15000);
                              return () => clearInterval(interval);
                        
    
                    } catch (error) {
                        console.log(error)
                    }
                }
            })()
        }, [account, totalbalance]);

    return (

        <>
        
        {props.header}
        <div className="position-relative">
            <img src={require('../assets/images/banner-background.png').default} className="banner-background"/>
            <div className="banner-section h-100 py-md-5">
                <Container>

                    <Row className="align-items-center mb-5">

                        <Col lg={3}>


                            <DropdownButton  title={isType == "stake" ? "Staking":isType == "unstaking" ? "Unstaking":isType == "withdraw" ? "Withdraw":"Staking"} className="staking-dropdown">
                            {
                            isType == "stake" ? "":
                                <Dropdown.Item href="#" onClick={(e)=>setIsType("stake")}>Staking</Dropdown.Item>
                            }
                            {
                            isType == "unstaking" ? "":
                                <Dropdown.Item href="#" onClick={(e)=>setIsType("unstaking")}>Unstaking</Dropdown.Item>
                            }
                            {
                            isType == "withdraw" ? "":
                                <Dropdown.Item href="#" onClick={(e)=>setIsType("withdraw")}>Withdraw</Dropdown.Item>
                            }
                            </DropdownButton>

                        </Col>

                        <Col lg={3}>

                            <div className="ido-box ido-small" style={{background: "#39065E"}}>

                                <p className="f-bold text-center">Number Of Stackers</p>
                                <h4 className="soon text-center mt-2">{stakersNo}</h4>

                            </div>

                        </Col>

                        <Col lg={3}>
                            
                        <div className="ido-box ido-small" style={{background: "#39065E"}}>

                            <p className="f-bold text-center">Total Zpad Stacked</p>
                            {totalToken > 1 ? (
                                <h4 className="soon text-center mt-2">{Math.floor(totalToken)}</h4>
                            ) : (
                                <h4 className="soon text-center mt-2">{("NA")}</h4>
                            )}
                            {/* <h4 className="soon text-center mt-2">{(totalToken)}</h4> */}

                        </div>

                        </Col>

                        <Col lg={3}>
                            
                        <div className="ido-box ido-small" style={{background: "#39065E"}}>

                            <p className="f-bold text-center">APY</p>
                            <h4 className="soon text-center mt-2">{userApy}</h4>

                        </div>

                        </Col>
                        <Col lg={3}>
                        <button  onClick={async (event) => {
                            const provider = await detectEthereumProvider()
                            provider.sendAsync({
                                method: 'metamask_watchAsset',
                                params: {
                                "type": "ERC20",
                                "options": {
                                    "address": rewardToken_addr,
                                    "symbol": "RT",
                                    "decimals": 18,
                                },
                                },
                            }, (err, added) => {
                                // console.log('provider returned', err, added)
                                if (err || 'error' in added) {
                            
                                setTokenError("There was a problem adding the token.")
                                return
                                }
                                setTokenError("Token added!")
                            })
                            }}  className="btn-custom primary-btn mt-2">Reward
                        </button>

                        </Col>
                    </Row>

                    <Row className="align-items-center">

                        <Col lg={8} sm={12} md={6} className="text-center">
                            <img src={BannerImage} className="feature-img"/>
                        </Col>

                        <Col lg={4} sm={12} md={6}>
                            
                        {error == 1 ? (
                                
                                <Modal show={show1} onHide={handleClose1}  className='custom-modal' size="lg"
                                aria-labelledby="contained-modal-title-vcenter"
                                centered>
                                    <Modal.Body>
                                    <div style={{textAlign:"center"}}>
                                          <p style={{ color:"red"}} >{msgHandling.message || msgHandling}</p>
                                    </div>
                                    </Modal.Body>
                                
                            </Modal>
                            
                        ): null}
                           
                        <div className="ido-box" style={{background: "#39065E"}}>
                            

                            <div className="staked">
                                <h4>Staked</h4>
                                <h2>{Math.floor(totalbalance)}</h2>
                                {/* {console.log("totalbalance", totalbalance)} */}
                            </div>

                            <div className="staked">
                                <h4>Unstaked</h4>
                                <h2>{Math.floor(userUnstakedValue)}</h2>
                            </div>

                            <div className="staked">
                                <h4>Reward</h4>
                                <h2>{Math.floor(userReward)}</h2>
                            </div>
                        
                            
                            {isType == "stake" ? (<Form className="text-center mt-3">
                                
                                <Form.Group className="mb-3 max-staked" controlId="formBasicCheckbox">
                                <Form.Control type="text" value={stakevalue} placeholder="Stake Amount" onChange={(e)=>setStakevalue(e.target.value)} />
                                <Button onClick={MaxStake} className="">
                                    Max
                                </Button>
                                </Form.Group>
                                <Button onClick={Staking} type="submit" className="btn-custom secondary-btn">
                                    Stake
                                </Button>
                            </Form>) : null}

                            {isType == "unstaking" ? (<Form className="text-center mt-3">
                                
                                <Form.Group className="mb-3 max-staked" controlId="formBasicCheckbox">
                                <Form.Control type="text" value={unStakeValue} placeholder="Stake Amount" onChange={(e)=>setUnStakeValue(e.target.value)} />
                                <Button onClick={MaxUnStake} className="">
                                    Max
                                </Button>
                                </Form.Group>
                                <Button onClick={unStaking} type="submit"  className="btn-custom secondary-btn">
                                    UnStake
                                </Button>
                            </Form>) : null}

                            {/* withdraw */}

                            {isType == "withdraw" ? (
                                <div  className="text-center mt-3">
                                <Button onClick={Reward} type="submit"  className="btn-custom secondary-btn">
                                    Withdraw
                                </Button>
                                </div>
                            ) : null}


                        </div>

                        </Col>

                        

                    </Row>
                </Container>
            </div>
        </div>

        
         {
             isType == "stake" &&
             <div>
         <h2 className="text-center h2">Stake your Zpad</h2>

                <Container>

                <div class="roadmap">

                    <div class="roadmap-item circle-active">

                        <div class="roadmap-circle">
                            <img src={checkpoint}/>
                        </div>

                        <p>Checkpoint</p>

                    </div>

                    <hr class="roadmap-hr"/>

                    {stakevalue > bronze || mystate > bronze ? 
                    (<div class="roadmap-item circle-active">


                    <div class="roadmap-circle">
                    <img src={amountstack}/>
                    
                    </div>

                    <p>Amount to Stake</p>

                </div>): (<div class="roadmap-item">


                        <div class="roadmap-circle">
                        <img src={amountstack}/>

                        </div>

                        <p>Amount to Stake</p>

                        </div>)}

                    {/* <div class="roadmap-item circle-active">


                        <div class="roadmap-circle">
                        <img src={amountstack}/>
                        
                        </div>

                        <p>Amount to Stake</p>

                    </div> */}

                    <hr class="roadmap-hr"/>

                    {authorization == "Pre-authorization" ? (<div class="roadmap-item circle-active">

                        <div class="roadmap-circle">
                        <img src={preauth}/>
                        </div>

                        <p>Pre-authorization</p>

                        </div>) : (<div class="roadmap-item">

                        <div class="roadmap-circle">
                        <img src={preauth}/>
                        </div>

                        <p>Pre-authorization</p>

                        </div>)}



                    {/* <div class="roadmap-item">

                        <div class="roadmap-circle">
                        <img src={preauth}/>
                        </div>

                        <p>Pre-authorization</p>

                    </div> */}

                    <hr class="roadmap-hr"/>

                    {Confirmation == "Confirmation" ?
                     ( <div class="roadmap-item circle-active">

                     <div class="roadmap-circle">
                     <img src={confirm}/>
                     </div>

                     <p>Confirm</p>

                 </div>) : ( <div class="roadmap-item">

                        <div class="roadmap-circle">
                        <img src={confirm}/>
                        </div>

                        <p>Confirm</p>

                        </div>)}

                    {/* <div class="roadmap-item">

                        <div class="roadmap-circle">
                        <img src={confirm}/>
                        </div>

                        <p>Confirm</p>

                    </div> */}

                    <hr class="roadmap-hr"/>

                    {confirmed == "Confirmed" ? 
                    (<div class="roadmap-item circle-active">

                    <div class="roadmap-circle">
                    <img src={confirmation}/>
                    </div>

                    <p>Confirmation</p>

                </div>) : (<div class="roadmap-item">

                            <div class="roadmap-circle">
                            <img src={confirmation}/>
                            </div>

                            <p>Confirmation</p>

                        </div>)}

                        {/* <div class="roadmap-item">

                            <div class="roadmap-circle">
                            <img src={confirmation}/>
                            </div>

                            <p>Confirmation</p>

                        </div> */}

                    

                </div>

                <h4 className="mb-4">The following conditions must be met before proceeding</h4>

                <div className="ido-box" style={{background: "transparent"}}>

                    <div className="d-flex mb-5 flex-xs-wrap">

                        <div className="conditions">

                            <span className="conditions-met">
                                <h4>Connected with MetaMask</h4>
                                <span className="tick-enable"><i class="fa-solid fa-check"></i></span>
                            </span>

                            <p>If not connected, click
                                the "Connect Wallet" 
                                button in the top right
                                corner
                            </p>

                        </div>

                        <div className="conditions">

                            <span className="conditions-met">
                                <h4>Connected with MetaMask</h4>
                                <span className="tick-enable tick-disble"><i class="fa-solid fa-check"></i></span>
                            </span>

                            <p>If not connected, click
                                the "Connect Wallet" 
                                button in the top right
                                corner
                            </p>

                        </div>

                        <div className="conditions">

                            <span className="conditions-met">
                                <h4>Connected with MetaMask</h4>
                                <span className="tick-enable tick-disble"><i class="fa-solid fa-check"></i></span>
                            </span>

                            <p>If not connected, click
                                the "Connect Wallet" 
                                button in the top right
                                corner
                            </p>

                        </div>

                        <div className="conditions">

                            <span className="conditions-met">
                                <h4>Connected with MetaMask</h4>
                                <span className="tick-enable tick-disble"><i class="fa-solid fa-check"></i></span>
                            </span>

                            <p>If not connected, click
                                the "Connect Wallet" 
                                button in the top right
                                corner
                            </p>

                        </div>

                    </div>

                    <Form>
                        <div class="custom-checkbox">
                            <input type="checkbox" class="custom-control-input" id="defaultUnchecked" />
                            <label class="custom-control-label" for="defaultUnchecked">I have read the Terms and Conditions</label>
                        </div>
                    </Form>

                </div>

                <div className="text-center my-5">
                    <Link to={'/'} className="btn-custom secondary-btn">Next</Link>
                </div>

                </Container>
         </div>
       
         }
         {
             isType == "unstaking" &&
             <div>
               <h2 className="text-center h2">Unstake your Zpad</h2>

                    <Container>

                    <div class="roadmap">

                        <div class="roadmap-item circle-active">

                            <div class="roadmap-circle">
                                <img src={warning}/>
                            </div>

                            <p>Warning</p>

                        </div>

                        {/* <hr class="roadmap-hr"/>

                        <div class="roadmap-item">

                            <div class="roadmap-circle">
                            <img src={checklist}/>
                            </div>

                            <p>Checklist</p>

                        </div> */}

                        <hr class="roadmap-hr"/>

                        {/* <div class="roadmap-item">

                            <div class="roadmap-circle">
                            <img src={amountstack}/>
                            </div>

                            <p>Amount to Stake</p>

                        </div>

                        <hr class="roadmap-hr"/> */}

                        {authorization == "Unstake" ? (
                            <div class="roadmap-item circle-active">

                            <div class="roadmap-circle">
                            <img src={confirm}/>
                            </div>

                            <p>Initialize Unstake</p>

                        </div>
                        ) : (
                            <div class="roadmap-item">

                            <div class="roadmap-circle">
                            <img src={confirm}/>
                            </div>

                            <p>Initialize Unstake</p>

                        </div>
                        )}


                        <hr class="roadmap-hr"/>

                        {confirmed == "Unstake_Confirmed" ? (
                             <div class="roadmap-item circle-active">

                             <div class="roadmap-circle">
                             <img src={confirmation}/>
                             </div>

                             <p>Confirmation</p>

                         </div>
                        ) : (
                            <div class="roadmap-item">

                            <div class="roadmap-circle">
                            <img src={confirmation}/>
                            </div>

                            <p>Confirmation</p>

                        </div>
                        )}
                            {/* <div class="roadmap-item">

                                <div class="roadmap-circle">
                                <img src={confirmation}/>
                                </div>

                                <p>Confirmation</p>

                            </div> */}

                        

                    </div>


                    <div className="ido-box" style={{background: "transparent"}}>

                    <div className="unstaking-warn">

                            <img src={warningyellow}/>
                            <p>After Unstaking, you must wait 7 days before you can withdraw your BSCPAD and rewards.

                            The amount of tokens you Unstake will not count towards your tier level for upcoming Projects.</p>

                    </div>

                    </div>

                    <div className="text-center my-5">
                        <Link to={'/'} className="btn-custom secondary-btn">Next</Link>
                    </div>

                    </Container>
             </div>
         }
         {
             isType == "withdraw" &&
             <div>
                 <h2 className="text-center h2">Deposit your Zpad</h2>

                        <Container>

                        <div class="roadmap">

                                                            
                           
                            <div class="roadmap-item circle-active">

                                <div class="roadmap-circle">
                                    <img src={checkpoint}/>
                                </div>

                                <p>Checkpoint</p>

                            </div>
                            


                            {/* <hr class="roadmap-hr"/> */}

                            {/* <div class="roadmap-item">

                                <div class="roadmap-circle">
                                <img src={amountstack}/>
                                </div>

                                <p>Amount to Stake</p>

                            </div> */}


                            <hr class="roadmap-hr"/>

                            {authorization == "Withdraw" ? (
                                <div class="roadmap-item circle-active">

                                <div class="roadmap-circle">
                                <img src={confirm}/>
                                </div>

                                <p>Initialize Withdraw</p>

                            </div>
                            ) : (
                                <div class="roadmap-item">

                                <div class="roadmap-circle">
                                <img src={confirm}/>
                                </div>

                                <p>Initialize Withdraw</p>

                            </div>
                            )}


                            <hr class="roadmap-hr"/>

                            {confirmed == "Withdraw_Confirmed" ? (
                                <div class="roadmap-item circle-active">

                                <div class="roadmap-circle">
                                <img src={confirmation}/>
                                </div>

                                <p>Confirmed</p>

                            </div>
                            ) : (
                                <div class="roadmap-item">

                                    <div class="roadmap-circle">
                                    <img src={confirmation}/>
                                    </div>

                                    <p>Confirmation</p>

                                </div>
                            )}


                            

                        </div>

                        <h4 className="mb-4">The following conditions must be met before proceeding</h4>

                        <div className="ido-box" style={{background: "transparent"}}>

                            <div className="d-flex mb-5 flex-xs-wrap">

                                <div className="conditions">

                                    <span className="conditions-met">
                                        <h4>Connected with MetaMask</h4>
                                        <span className="tick-enable"><i class="fa-solid fa-check"></i></span>
                                    </span>

                                    <p>If not connected, click
                                        the "Connect Wallet" 
                                        button in the top right
                                        corner
                                    </p>

                                </div>

                                <div className="conditions">

                                    <span className="conditions-met">
                                        <h4>Connected with MetaMask</h4>
                                        <span className="tick-enable tick-disble"><i class="fa-solid fa-check"></i></span>
                                    </span>

                                    <p>If not connected, click
                                        the "Connect Wallet" 
                                        button in the top right
                                        corner
                                    </p>

                                </div>

                                <div className="conditions">

                                    <span className="conditions-met">
                                        <h4>Connected with MetaMask</h4>
                                        <span className="tick-enable tick-disble"><i class="fa-solid fa-check"></i></span>
                                    </span>

                                    <p>If not connected, click
                                        the "Connect Wallet" 
                                        button in the top right
                                        corner
                                    </p>

                                </div>

                                <div className="conditions">

                                    <span className="conditions-met">
                                        <h4>Connected with MetaMask</h4>
                                        <span className="tick-enable tick-disble"><i class="fa-solid fa-check"></i></span>
                                    </span>

                                    <p>If not connected, click
                                        the "Connect Wallet" 
                                        button in the top right
                                        corner
                                    </p>

                                </div>

                            </div>

                            <Form>
                                <div class="custom-checkbox">
                                    <input type="checkbox" class="custom-control-input" id="defaultUnchecked" />
                                    <label class="custom-control-label" for="defaultUnchecked">I have read the Terms and Conditions</label>
                                </div>
                            </Form>

                        </div>

                        <div className="text-center my-5">
                            <Link to={'/'} className="btn-custom secondary-btn">Next</Link>
                        </div>

                        </Container>
             </div>
         }
    

      

        

        {props.footer}

        </>

    )

}

export default Stacking;

// function Stacking(props){
//     return(<div>jfhjfhj</div>)
// }

// export default Stacking;
