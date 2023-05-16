import Head from "next/head";
import { darkBlue, fadeGrey, lightGrey, pelorous, secondary100 } from "../css/color-palette";
export default function AppHead({ colorTheme }: any) {
	return (
		<Head>
			<link rel="shortcut icon" href="https://cdn-icons-png.flaticon.com/512/5578/5578816.png" />
			<style>{`
                    body {
                        height:auto;
                        margin: 0;
                        font-family: Inter, "Helvetica Neue", Helvetica, Arial, "Open Sans", sans-serif;
                    }
                    ::-webkit-scrollbar {
                        width: 2px;
                        height:2px;
                    }
                    ::-webkit-scrollbar-thumb {
                      background-color: ${pelorous} !important;
                      border-radius:5px;
                      outline: 1px solid lightgray;
                    }
                    body,.MuiTableBody-root .MuiTableRow-root .MuiTableCell-root,input,.MuiSelect-select{
                        font-size:13px;	
                        
                    }	
                    // .tss-djbknv-MUIDataTablePagination-navContainer{
                    //     justify-content:space-between !important;
                    //     width:500px !important;
                    // }
                    .MuiChip-root{
                        background-color: rgba(33, 150, 243, 0.1);
                        height:35px !important;
                    }
                    .MuiChip-deleteIcon{
                        font-size:20px !important;
                    }
                    #details,select,body,.tss-gm6zfk-MUIDataTableHeadCell-fixedHeade,.tss-ynxllk-MUIDataTableFilter-root,#logOut{
                        background-color: ${colorTheme.bodyColor} !important;
                    }


                    .swal2-container.swal2-center>.swal2-popup,.MuiBox-root,#card,#profile,#nav,.tss-1ork7hi-MUIDataTablePagination-tableCellContainer,.MuiPaper-root{
                        background-color: ${colorTheme.tableColor} !important;
                       }
                       .MuiTableCell-root{
                        border-bottom: 1px solid  ${colorTheme.navBorder} !important;
                    }
                    .MuiTypography-root,.MuiTableCell-root,label,#details,.tss-ynxllk-MUIDataTableFilter-root p,#profile,.swal2-container.swal2-center>.swal2-popup,#card{
                        color:${colorTheme.textColor} !important;
                    }
                    
                    button{
                        background:${colorTheme.tableColor};
                    }
                    
                    body,input,.tss-1ork7hi-MUIDataTablePagination-tableCellContainer,.MuiTablePagination-root,.MuiPaper-root{
                        color:${colorTheme.heading} ;
                    }
                    a div span,p span,span b,p svg,ul svg{
                        color:${colorTheme.iconColor};
                    }
                    .MuiTypography-root svg, .MuiTypography-root span, a div svg,a div span,li div svg{
                        color: #ffff !important;
                    }
                    input,{
                        border:none;
                        color:${colorTheme.heading} !important;
                        ::placeholder {
                            opacity: 1;
                            font-weight: 300;
                            background-color: ${colorTheme.bodyColor} !important;
                            border-color:${colorTheme.bodyColor} !important;
                            color:${colorTheme.heading} !important;
                        }
                        :focus{
                            background-color: ${colorTheme.bodyColor} !important;
                            color:${colorTheme.heading} !important;
                        }
                    }
                    .MuiInputBase-root{
                        ::placeholder {
                            opacity: 1;
                            font-size:13px;
                            font-weight: 300;
                            color:#787878 !important;
                        }
                        :focus{
                            color:#787878 !important;
                        }

                    }
                    select{
                        ::placeholder {
                            opacity: 1;
                            font-weight: 300;
                            background-color: gray !important;
                        }	
                    }
                    .MUIDataTableToolbar {
                        .root {
                           display: 'none'
                       }
                   }
                      .swal2-container.swal2-top, .swal2-container.swal2-center, .swal2-container.swal2-bottom{
                        z-index:9999;
                      }
                    
                      .swal2-title{
                        font-size: 13px !important;

                      }
                      .swal2-icon{
                        font-size: 10px !important;

                      }
                      .css-ux7pva-MuiTableCell-root{
                        padding:0px !important;
                      }
                      .MuiDialog-container{
                        height:auto !important;
                        align-items:start !important;
                      }
                      .MuiDialog-root{
                        overflow:scroll;
                      }
                     
                    .tss-hj53wm-MUIDataTableToolbar-titleText{
                        font-size:1rem;
                    }
                    .MuiModal-backdrop{
                        background-color: rgb(0 0 0 / 8%) !important;
                    }

                    .MuiMenu-root .MuiModal-backdrop{
                        background-color: rgb(0 0 0 / 2%) !important;
                    }
                    .css-1poimk-MuiPaper-root-MuiMenu-paper-MuiPaper-root-MuiPopover-paper{
                        position:relative;
                        width:100px;
                    }
                    .css-1ilppau-MuiTableCell-root{
                        padding:0px !important;
                        padding-left:16px !important;
                    }
                    // .MuiTableBody-root .MuiTableRow-root .MuiTableCell-root{
                    //     padding:0px !important;
                    //     padding-left:16px !important;

                    // }
                    .table.dataTable {
                        width: auto !important;
                    }
                    .MuiOutlinedInput-notchedOutline{
                        display: block;
                        padding: 0.375rem 0.75rem;
                        font-size: 13px;
                        font-weight: 400;
                        line-height: 1.5;
                        border-radius: 4px;
                        transition: none;
                        min-height: 29px;
                        color:black !important;
                        border: 1px solid ${fadeGrey};
                        outline: none;					
                    }
                    .MuiAccordion-root{
                        background:none !important;
                        border:none !important;
                    }
                    .MuiTableFooter-root .MuiTableCell-root{
                        border: none !important;
                    }
                    .tss-gm6zfk-MUIDataTableHeadCell-fixedHeader{
                        font-size:10px !important;
                        padding-right: 0px !important;
                         padding-top: 0px !important;
                         padding-bottom: 0px !important;
                    }
                
                    .MuiPaper-rounded{
                        box-shadow: none !important;
                        
                    }
                    .MuiPagination-root{
                        width:100%;
                    }
                    .MuiTablePagination-displayedRows {
                       display:flex !important;
                       justify-content:end;
                      width:auto;
                    }
                    
                    .MuiTablePagination-spacer{
                        flex:none !important;
                    }
                    .MuiDialog-paper,.MuiPaper-rounded,.MuiTableRow-root,.tss-1ork7hi-MUIDataTablePagination-tableCellContainer,.MuiTable-root{
                        border-radius:4px !important;
                    }
                    .MuiDialog-container div button svg{
                        color:black !important;
                    }
                    .tss-ylo811-MUIDataTableSelectCell-headerCell{
                        background:rgba(0,0,0,.075) !important;
                        width:20px !important;
                        height:10px !important;
                    }
                    .MuiMenu-paper {
                        border-radius: 4px !important;
                        width:215px;

                    }
                    .MuiMenu-root  .MuiMenu-paper {
                        border-radius: 4px !important;
                        width:210px;
                        margin-top:10px !important;
                    }

                    .MuiTableHead-root .MuiTableRow-root{
                        font-size: 12px !important;
                        font-weight: 600;
                        border-bottom: 1px solid #C0C0C0 !important;
                        border-top: 1px solid #C0C0C0 !important;
                    }
                    .MuiButtonBase-root{
                        font-size:15px;
                        font-weight: 500 !important;
                    }
                    .MuiTableCell-root span button div div .MuiTableSortLabel-root{
                        font-weight: 500 !important;
                    }
                    .MuiTablePagination-root{
                        overflow:hidden;
                    }
                    .MuiTableCell-head span .MuiButtonBase-root{
                        font-weight:500 !important;
                        font-size:13px !important;
                    }
                    
              
                    .MuiDialog-paperWidthXs{
                        margin-top:calc(25% - 228px/2) !important;
                    }
                    .tss-1cdcmys-MUIDataTable-responsiveBase::-webkit-scrollbar {
                        width: 1px !important;
                    }
                    // .tss-1ork7hi-MUIDataTablePagination-tableCellContainer{
                    //     padding:45px !important;
                    // }
                   
                    .MuiBadge-badge{
                        background-color:${pelorous} !important;
                        color:white;
                        min-width:24px;
                    }
                  
                    .MuiToolbar-root {
                        padding-top : 10px;
                    }
                    .MuiTableCell-head span .MuiButtonBase-root {
                        font-weight: 700 !important;
                        font-size: 13px !important;
                    }
                    .MuiTableCell-root{
                        border-bottom : none !important;
                    }
                    .MuiTableRow-head .MuiTableCell-root{
                        padding-left:8px !important;
                        background: #DAEEFA;
                        width: 1095px;
                        height: 29px;
                    }
                    .MuiAutocomplete-popper {
                        border: 1px solid ${lightGrey};
                        margin: 10px 0 !important;
                        border-radius: 4px;
                    }
                    .MuiAccordionSummary-root{
                        min-height:0px !important;
                        height:25px !important;
                    }
                    .MuiAccordionSummary-content{
                        margin:0px !important;
                    }
                    .tss-1cdcmys-MUIDataTable-responsiveBase{
                        padding:10px 0;
                    }							
                    .MuiDrawer-paper {
                        opacity: green !important;
                        transition-duration:
                    }
                    .MuiTable-root{
                        padding:10px !important;
                    }
                    div > .Mui-expanded {
                        margin-bottom:5px;
                    }
                    .MuiTab-root{
                        text-transform:none;
                    }
                    .Mui-disabled {
                        background: #EFEFEF4D !important;
                        color: ${lightGrey} !important;
                    }
                    @media only screen and (min-width: 320px) and (max-width:480px){
                        .e-css-1betqn-MuiAccordionSummary-content{
                            margin: 3px -10px !important;
                        }
                    }
                    @media only screen and (min-width: 480px) and  (max-width:768px){
                        .e-css-1betqn-MuiAccordionSummary-content{
                            margin: 3px -10px !important;
                        }
                    }
                `}</style>
		</Head>
	);
}
