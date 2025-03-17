 import { Box, Typography } from "@mui/material"
import React from "react"
 
 const DynaCard =()=>{
     return (
        <>
        <Box sx={{
            display:"flex",
             backgroundColor:"#FFFFFF",
             height:'45px',
             borderRadius:"10px",
             justifyContent:"center",
             alignItems:"center",
             
        }}>
            <Box sx={{
                width:"70%",
                p:1
            }}>
            <span style={{fontSize:"20px",display:'block', fontWeight:'bold'}}>$50.0K</span>
            <span style={{fontSize:"10px",display:'block'}}>Market Cap</span>
            </Box>
            <Box sx={{
                backgroundColor:"#67FF0A",
                display:"flex",
                alignItems:"center",
                borderBottomRightRadius: "10px",
                borderTopRightRadius: "10px",
                height: "100%",
                pl:0.5
            }}>
            20%    
            </Box>
        </Box>
        </>
     )
 }

 export default DynaCard