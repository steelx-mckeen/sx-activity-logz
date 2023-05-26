import React from "react";
import PropTypes from "prop-types";
import { Tabs, Tab, FormGroup, Checkbox, Row, Col } from "react-bootstrap";
// import { utc } from 'moment';
// import { get, post } from '../../../lib/request';
// import Wysiwyg from '../../../components/Wysiwyg/Wysiwyg';
// import LoadingButton from '../../../components/LoadingButton/LoadingButton';
// import PageTitle from '../../../components/PageTitle/PageTitle';
// import { alertError, alertSuccess } from '../../../lib/utils';
// import CONFIG from '../../../config';

import "./index.css";
import { ActivityLog } from '@steelxorg/sx-activity-logz';
import { LoadingButton } from '@steelxorg/sx-activity-logz';
// import LoadingButton from "./components/LoadingButton/LoadingButton.jsx";
// import ActivityNotes from "./components/ActivityLog/ActivityLog.jsx";
// import ActivityNotes from "sx-activity-logs";

// import Loader from '../../../components/Loader/Loader';
// import ActivityNotes from '../../../components/Activity/ActivityNotes';
// import AttachmentDragAndDrop from '../../../components/AttachmentDragAndDrop/AttachmentDragAndDrop';

import activitiesData from "../../assets/activitiesData.json";
import jsonData1 from "../../assets/franchiseeData.json";

class Demo extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			notes: "",
			notesLoading: false,
			activities: [],
			loadingActivities: false,
			attachmentList: [],
			managementNote: false,
			deleteNoteLoading: false,
		};

		this.updateNotes = this.updateNotes.bind(this);
		this.onSaveNote = this.onSaveNote.bind(this);
		this.onFieldChange = this.onFieldChange.bind(this);
		this.onFileUpload = this.onFileUpload.bind(this);
		this.onDeleteNote = this.onDeleteNote.bind(this);
		this.uploadFile = this.uploadFile.bind(this);
		this.onUpdateAttachmentList = this.onUpdateAttachmentList.bind(this);
		this.onManagementNoteChange = this.onManagementNoteChange.bind(this);
	}

	async componentDidMount() {
		this.getActivities();
	}

	async onSaveNote(
		notes,
		managementNote,
		attachmentList,
		id,
		isEdit,
		creator,
		agentJobNum
	) {
		// const { companyCtx } = this.props;
		// const { activities } = this.state;
		// const requestBody = {
		//   id,
		//   creator,
		//   agentJobNum,
		//   noteText: notes,
		//   isEdit,
		//   isManagementNote: managementNote,
		//   attachmentList,
		// };
		// try {
		//   this.setState({
		//     notesLoading: true,
		//   });
		//   const response = await post(
		//     `${CONFIG.apiBase}/FranchiseNotesApi/Save?companyCtx=${companyCtx}`,
		//     requestBody,
		//     false
		//   );
		//   if (response.success) {
		//     if (attachmentList.length > 0) {
		//       // *TODO*
		//       // fix backend: to get correct id from the add note response
		//       // fix backend: attachments are not added
		//       console.log(response.data.id);
		//       this.uploadFile(attachmentList, response.data.id);
		//     }
		//     this.setState({
		//       loadingActivities: true,
		//     });
		//     const index = activities.findIndex(
		//       activity => activity.id === response.data.id
		//     );
		//     if (index === -1) {
		//       const updatedActivities = [response.data, ...activities];
		//       this.setState({
		//         activities: updatedActivities,
		//         loadingActivities: false,
		//         notesLoading: false,
		//       });
		//     } else {
		//       const updatedActivities = [...activities];
		//       updatedActivities[index] = response.data;
		//       console.log(updatedActivities);
		//       this.setState({
		//         activities: updatedActivities,
		//         loadingActivities: false,
		//         notesLoading: false,
		//       });
		//     }
		//     alertSuccess(`${isEdit ? 'Note updated.' : 'Note saved.'}`);
		//   } else {
		//     alertError(response.message);
		//     return false;
		//   }
		//   this.setState({
		//     notesLoading: false,
		//     attachmentList: [],
		//     notes: '',
		//   });
		//   return true;
		// } catch (e) {
		//   alertError(
		//     `${isEdit ? 'Failed to update note.' : 'Failed to update note.'}`
		//   );
		//   return false;
		// }
	}

	async onDeleteNote(id) {
		// const { companyCtx } = this.props;
		// const { activities } = this.state;
		// try {
		//   this.setState({
		//     deleteNoteLoading: true,
		//   });
		//   const response = await post(
		//     `${CONFIG.apiBase}/FranchiseNotesApi/Delete?companyCtx=${companyCtx}`,
		//     { id },
		//     false
		//   );
		//   if (response.success) {
		//     const updatedActivities = activities.filter(
		//       activity => activity.id !== id
		//     );
		//     this.setState({
		//       activities: updatedActivities,
		//       deleteNoteLoading: false,
		//       attachmentList: [],
		//       notes: '',
		//     });
		//     alertSuccess('Note deleted.');
		//   } else {
		//     alertError(response.message);
		//   }
		//   return response.success;
		// } catch (error) {
		//   alertError('Failed to delete note.');
		//   return false;
		// }
	}

	onFieldChange(e) {
		const { name, type, checked } = e.target;

		let { value } = e.target;

		if (type === "checkbox") {
			value = checked;
		}

		this.setState({
			[name]: value,
		});
	}

	onUpdateAttachmentList(newAttachmentList) {
		this.setState({
			attachmentList: newAttachmentList,
		});
	}

	onFileUpload(uploadedArr) {
		const { attachmentList } = this.state;

		const newAttachments = attachmentList.concat(uploadedArr);

		this.setState({
			attachmentList: newAttachments,
		});
	}

	onManagementNoteChange(event) {
		const { checked } = event.target;

		this.setState({ managementNote: checked });
	}

	async getActivities() {
		// const { companyCtx } = this.props;

		// try {
		//   let response = null;

		//   this.setState({
		//     loadingActivities: true,
		//   });

		//   response = await get(
		//     `${CONFIG.apiBase}/FranchiseNotesApi/GetFranchiseNotes?companyCtx=${companyCtx}`
		//   );

		//   this.setState({
		//     activities: response.data.noteList,
		//     loadingActivities: false,
		//   });
		// } catch (e) {
		//   this.setState({
		//     loadingActivities: false,
		//   });
		//   alertError('Could not fetch activities');
		// }

		this.setState({
			activities: jsonData1.data.noteList,
			loadingActivities: false,
		});
	}

	async uploadFile(fileData, noteId) {
		const { companyCtx } = this.props;

		// try {
		//   if (fileData == null || fileData.length === 0) {
		//     alertError('Please select file to upload.');

		//     return;
		//   }

		//   this.setState({
		//     notesLoading: true,
		//   });

		//   const formData = new FormData();

		//   for (let i = 0; i < fileData.length; i += 1) {
		//     formData.append(`file[${i}]`, fileData[i]);
		//   }

		//   const response = await post(
		//     `${CONFIG.apiBase}/FranchiseNotesApi/UploadAttachment?companyCtx=${companyCtx}&id=${noteId}`,
		//     formData,
		//     true
		//   );

		//   if (response.success) {
		//     this.setState({
		//       notesLoading: false,
		//     });
		//     // alertSuccess('File uploaded.');
		//   } else {
		//     alertError(response.message);
		//   }
		// } catch (e) {
		//   alertError('Upload failed');
		// }
	}

	updateNotes(notes) {
		this.setState({
			notes,
		});
	}

	render() {
		const {
			notes,
			notesLoading,
			loadingActivities,
			activities,
			attachmentList,
			managementNote,
			deleteNoteLoading,
		} = this.state;

		return (
			<div
				id="FranchiseeNotes"
				className="padding20 container"
				style={{ margin: "auto" }}
			>
				{/* <PageTitle>Franchise Notes - SMS</PageTitle> */}
				<Row>
					<Col md={9} className="offset-md-3" style={{ marginLeft: "15%" }}>
						<div className="position-relative">
							<div className="activity-tabs">
								<Tabs defaultActiveKey={1} animation={false} id="activity-tabs">
									<div className="activity-line" />

									{!loadingActivities && (
										<Tab eventKey={1} title="Notes">
											<>
												{activities &&
													activities.map(
														({
															id,
															creator,
															agentJobNum,
															noteText,
															createdDateUTC,
															attachments,
															category,
														}) => {
															//   const activityDate = createdDateUTC
															//     ? utc(createdDateUTC)
															//         .local()
															//         .format('DD MMM YYYY, LT')
															//     : 'n/a';
															const activityDate = "n/a";

															const hasAttachments =
																attachments && attachments.length > 0;

															return (
																<ActivityLog
																	id={id}
																	key={id}
																	creator={creator}
																	agentJobNum={agentJobNum}
																	body={noteText}
																	activityDate={activityDate}
																	hasAttachments={hasAttachments}
																	attachments={attachments}
																	category={category}
																	isFranchisee
																	isManagmentNote
																	onSaveNote={this.onSaveNote}
																	onDeleteNote={this.onDeleteNote}
																	isNotesLoading={notesLoading}
																	isDeleteNoteLoading={deleteNoteLoading}
																/>
															);
														}
													)}
											</>
										</Tab>
									)}
								</Tabs>

								{/* {loadingActivities && <Loader size="small" />} */}
							</div>
						</div>
					</Col>
				</Row>
			</div>
		);
	}
}

Demo.defaultProps = {
	companyCtx: "",
};

Demo.propTypes = {
	companyCtx: PropTypes.string,
};

export default Demo;
