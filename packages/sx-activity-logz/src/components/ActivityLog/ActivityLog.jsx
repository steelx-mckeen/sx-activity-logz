/* eslint-disable no-unused-vars */
// @ts-nocheck
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab, Row, Col, FormGroup, Checkbox } from 'react-bootstrap';

// absolutes
import 'open-sans-fontface';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.css';

// components
import LoadingButton from "../LoadingButton/LoadingButton"

// css
import '../../styles/ActivityLog.css';
import '../../styles/index.css'
import '../../styles/minified.css'

const ActivityLog = ({
  id,
  creator,
  agentJobNum,
  body,
  activityDate,
  hasAttachments,
  attachments,
  category,
  isFranchisee,
  isManagmentNote,
  onSaveNote,
  onDeleteNote,
  isNotesLoading,
  isDeleteNoteLoading,
}) => {
  const [editNote, setEditNote] = useState(false);
  const [attachmentList, setAttachmentList] = useState([]);
  const [attachmentListDisplay] = useState(attachments);
  const [note, setNote] = useState(body);
  const [managementNote, setManagementNote] = useState(isManagmentNote);
  const [notesLoading, setNotesLoading] = useState(isNotesLoading);
  const [deleteNoteLoading, setDeleteNoteLoading] = useState(
    isDeleteNoteLoading
  );
  const [showAttachmentViewer, setShowAttachmentViewer] = useState(true);
  const [selectedAttachment, setSelectedAttachment] = useState(null);

  function onManagementNoteChange(event) {
    const { checked } = event.target;

    setManagementNote(checked);
  }

  function onCancel() {
    setEditNote(false);
    setNote(body);
    setAttachmentList([]);
  }

  async function onSave() {
    setNotesLoading(true);
    await onSaveNote(
      note,
      managementNote,
      attachmentList,
      id,
      true,
      localStorage.getItem('username'),
      agentJobNum
    );
  }

  async function onDelete() {
    setDeleteNoteLoading(true);
    await onDeleteNote(id);
  }

  const handleAttachmentClick = attachment => {
    setSelectedAttachment(attachment);
    setShowAttachmentViewer(true);
  };

  const onUpdateAttachmentList = list => {
    setAttachmentList(list);
  };

  function getNoteAttachments() {
    return (
      <div className="note-attachment">
        <ul>
          {attachmentListDisplay.map(child => {
            const path = child.key;
            const parts = path.split('/');
            const name = parts.pop();

            return (
              <li key={child.key}>
                <span>
                  <a
                    // href={getUrlLink(
                    //   child.bucket,
                    //   child.key,
                    //   child.regionSystemName
                    // )}
                    onClick={event => {
                      event.preventDefault();
                    }}
                    key={child.key}
                    style={{ marginLeft: `0px` }}
                  >
                    <i className="fa fa-file" />
                    <span
                      onClick={() => {
                        handleAttachmentClick({
                          // url: getUrlLink(
                          //   child.bucket,
                          //   child.key,
                          //   child.regionSystemName
                          // ),
                          url: {},
                          name,
                        });
                      }}
                    >
                      {name}
                    </span>
                  </a>
                </span>
              </li>
            );
          })}
          {/* {selectedAttachment && (
            <AttachmentViewer
              url={selectedAttachment.url}
              details={{ name: selectedAttachment.name }}
              showDialog={showAttachmentViewer}
              onHideDialog={setShowAttachmentViewer}
            />
          )} */}
        </ul>
      </div>
    );
  }

  return (
    <div className="Activity activity-notes margin-top-5">
      <div
        className="activity-icon"
        onClick={() => isFranchisee && setEditNote(true)}
        style={{ cursor: isFranchisee && 'pointer' }}
      >
        <i className="fas fa-pen" />
      </div>

      <div className="activity-header">
        <div className="show-grid">
          <div className="activity-interaction-text">
            <div>
              <strong>{category > 0 ? 'Management Note' : 'Note'} </strong>added
              by {creator}
            </div>
          </div>
          <div className="grey activity-date">{activityDate}</div>
        </div>
      </div>

      <div className="activity-body clearfix padding20">
        <div className="activity-body-content">
          {/* <LoadingButton
            isLoading={deleteNoteLoading}
            className="delete-activity"
            onClick={onDelete}
          >
            <i className="fas fa-trash-alt" />
          </LoadingButton> */}
          <>
            {editNote ? (
              <div className="editor-inputs">
                <Tabs
                  defaultActiveKey={2}
                  animation={false}
                  id="job-detail-tabs"
                >
                  <Tab eventKey={2} title="Edit note">
                    {/* <Wysiwyg
                      content={note}
                      onContentChange={setNote}
                      placeholder="Add your notes here"
                    />
                    <AttachmentDragAndDrop
                      attachmentList={attachmentList}
                      onUpdateAttchmentList={onUpdateAttachmentList}
                    /> */}
                    {/* {hasAttachments && getNoteAttachments()} */}

                    <Row>
                      <Col md={8}>
                        <FormGroup>
                          <Checkbox
                            name="managementNote"
                            checked={managementNote}
                            onChange={onManagementNoteChange}
                          >
                            Management Note
                          </Checkbox>
                        </FormGroup>
                      </Col>
                      <Col md={4}>
                        <div className="text-right">
                          <LoadingButton
                            onClick={onSave}
                            isLoading={notesLoading}
                            disabled={
                              attachmentList.length > 0
                                ? false
                                : note.length === 0 || note === body
                            }
                          >
                            Save
                          </LoadingButton>
                          <LoadingButton
                            className="secondary margin-left"
                            onClick={onCancel}
                            disabled={note.length === 0}
                          >
                            Cancel
                          </LoadingButton>
                        </div>
                      </Col>
                    </Row>
                  </Tab>
                </Tabs>
              </div>
            ) : (
              <>
                <div dangerouslySetInnerHTML={{ __html: body }} />
                {/* {hasAttachments && getNoteAttachments()} */}
              </>
            )}
          </>
        </div>
      </div>
    </div>
  );
};

ActivityLog.defaultProps = {
  id: null,
  creator: '',
  agentJobNum: '',
  body: '',
  activityDate: '',
  hasAttachments: false,
  attachments: [],
  category: null,
  isFranchisee: false,
  isManagmentNote: false,
  onSaveNote: () => {},
  onDeleteNote: () => {},
  isNotesLoading: false,
  isDeleteNoteLoading: false,
};

ActivityLog.propTypes = {
  id: PropTypes.number,
  creator: PropTypes.string,
  agentJobNum: PropTypes.string,
  body: PropTypes.string,
  activityDate: PropTypes.string,
  hasAttachments: PropTypes.bool,
  attachments: PropTypes.array,
  category: PropTypes.number,
  isFranchisee: PropTypes.bool,
  isManagmentNote: PropTypes.bool,
  onSaveNote: PropTypes.func,
  onDeleteNote: PropTypes.func,
  isNotesLoading: PropTypes.bool,
  isDeleteNoteLoading: PropTypes.bool,
};

export default ActivityLog;
