import React, { useState, useEffect } from 'react';
import './PropertyInquiry.css';

const PropertyInquiries = () => {
    const [allInquiries, setAllInquiries] = useState([]);
    const [filteredInquiries, setFilteredInquiries] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState({ text: '', type: '' });
    const [replyForms, setReplyForms] = useState({});
    const [replyTexts, setReplyTexts] = useState({});
    
    // New inquiry form states
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [newInquiry, setNewInquiry] = useState({
        propertyId: '',
        userId: '',
        message: ''
    });
    const [createLoading, setCreateLoading] = useState(false);

    const API_BASE_URL = 'https://localhost:7117/api/property-inquiries';

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        const fetchData = async () => {
            try {
                const response = await fetch(API_BASE_URL, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                    signal: signal
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch inquiries');
                }

                const data = await response.json();
                if (!signal.aborted) {
                    setAllInquiries(data);
                    setLoading(false);
                }
            } catch (error) {
                if (error.name !== 'AbortError' && !signal.aborted) {
                    showMessage('Error loading inquiries. Please try again.', 'error');
                    setLoading(false);
                }
            }
        };

        fetchData();

        return () => {
            controller.abort();
        };
    }, []);

    // Filter inquiries when search term or status filter changes
    useEffect(() => {
        filterInquiries();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchTerm, statusFilter, allInquiries]);

    const fetchInquiries = async () => {
        try {
            const response = await fetch(API_BASE_URL, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch inquiries');
            }

            const data = await response.json();
            setAllInquiries(data);
        } catch (error) {
            if (error.name !== 'AbortError') {
                showMessage('Error loading inquiries. Please try again.', 'error');
            }
        }
    };

    const filterInquiries = () => {
        let filtered = allInquiries.filter(inquiry => {
            const matchesSearch = 
                inquiry.propertyTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                inquiry.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                inquiry.message.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesStatus = 
                statusFilter === 'all' ||
                (statusFilter === 'replied' && inquiry.ownerReply) ||
                (statusFilter === 'pending' && !inquiry.ownerReply);

            return matchesSearch && matchesStatus;
        });

        setFilteredInquiries(filtered);
    };

    const showReplyForm = (inquiryId) => {
        setReplyForms({ ...replyForms, [inquiryId]: true });
    };

    const cancelReply = (inquiryId) => {
        setReplyForms({ ...replyForms, [inquiryId]: false });
        setReplyTexts({ ...replyTexts, [inquiryId]: '' });
    };

    const handleReplyChange = (inquiryId, value) => {
        setReplyTexts({ ...replyTexts, [inquiryId]: value });
    };

    const submitReply = async (inquiryId) => {
        const replyText = replyTexts[inquiryId]?.trim();

        if (!replyText) {
            showMessage('Please enter a reply message.', 'error');
            return;
        }

        const controller = new AbortController();
        const signal = controller.signal;

        try {
            const response = await fetch(`${API_BASE_URL}/reply/${inquiryId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(replyText),
                signal: signal
            });

            if (!response.ok) {
                throw new Error('Failed to send reply');
            }

            if (!signal.aborted) {
                showMessage('Reply sent successfully!', 'success');
                setReplyForms({ ...replyForms, [inquiryId]: false });
                setReplyTexts({ ...replyTexts, [inquiryId]: '' });
                fetchInquiries(); // Refresh the list
            }
        } catch (error) {
            if (error.name !== 'AbortError' && !signal.aborted) {
                showMessage('Error sending reply. Please try again.', 'error');
            }
        }
    };

    // Handle new inquiry form input changes
    const handleNewInquiryChange = (field, value) => {
        setNewInquiry({ ...newInquiry, [field]: value });
    };

    // Create new inquiry
    const createInquiry = async (e) => {
        e.preventDefault();

        if (!newInquiry.propertyId || !newInquiry.userId || !newInquiry.message.trim()) {
            showMessage('Please fill in all fields', 'error');
            return;
        }

        setCreateLoading(true);

        try {
            const response = await fetch(API_BASE_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    propertyId: parseInt(newInquiry.propertyId),
                    userId: parseInt(newInquiry.userId),
                    message: newInquiry.message.trim()
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to create inquiry');
            }

            showMessage('Inquiry created successfully!', 'success');
            setShowCreateForm(false);
            setNewInquiry({ propertyId: '', userId: '', message: '' });
            fetchInquiries(); // Refresh the list
        } catch (error) {
            showMessage(error.message || 'Error creating inquiry. Please try again.', 'error');
        } finally {
            setCreateLoading(false);
        }
    };

    const showMessage = (text, type) => {
        setMessage({ text, type });
        setTimeout(() => {
            setMessage({ text: '', type: '' });
        }, 5000);
    };

    if (loading) {
        return (
            <div className="inquiries-container">
                <div className="loading">Loading inquiries...</div>
            </div>
        );
    }

    return (
        <div className="inquiries-container">
            <div className="header-section">
                <h1>Property Inquiries</h1>
                <button 
                    className="btn btn-primary"
                    onClick={() => setShowCreateForm(!showCreateForm)}
                >
                    {showCreateForm ? 'Cancel' : '+ Create New Inquiry'}
                </button>
            </div>

            {/* Create New Inquiry Form */}
            {showCreateForm && (
                <div className="create-inquiry-form">
                    <h2>Create New Inquiry</h2>
                    <form onSubmit={createInquiry}>
                        <div className="form-group">
                            <label>Property ID:</label>
                            <input
                                type="number"
                                value={newInquiry.propertyId}
                                onChange={(e) => handleNewInquiryChange('propertyId', e.target.value)}
                                placeholder="Enter property ID"
                                disabled={createLoading}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>User ID:</label>
                            <input
                                type="number"
                                value={newInquiry.userId}
                                onChange={(e) => handleNewInquiryChange('userId', e.target.value)}
                                placeholder="Enter user ID"
                                disabled={createLoading}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Message:</label>
                            <textarea
                                value={newInquiry.message}
                                onChange={(e) => handleNewInquiryChange('message', e.target.value)}
                                placeholder="Enter your inquiry message..."
                                rows="4"
                                disabled={createLoading}
                                required
                            />
                        </div>

                        <div className="action-buttons">
                            <button 
                                type="submit" 
                                className="btn btn-primary"
                                disabled={createLoading}
                            >
                                {createLoading ? 'Creating...' : 'Create Inquiry'}
                            </button>
                            <button 
                                type="button"
                                className="btn btn-secondary"
                                onClick={() => {
                                    setShowCreateForm(false);
                                    setNewInquiry({ propertyId: '', userId: '', message: '' });
                                }}
                                disabled={createLoading}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="filters">
                <input 
                    type="text" 
                    placeholder="Search by property or user..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select 
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                >
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="replied">Replied</option>
                </select>
            </div>

            {message.text && (
                <div className={message.type === 'error' ? 'error-message' : 'success-message'}>
                    {message.text}
                </div>
            )}

            {filteredInquiries.length === 0 ? (
                <div className="empty-state">
                    <h3>No inquiries found</h3>
                    <p>There are no property inquiries to display.</p>
                </div>
            ) : (
                filteredInquiries.map(inquiry => (
                    <div key={inquiry.inquiryId} className="inquiry-card">
                        <div className="inquiry-header">
                            <div className="inquiry-info">
                                <h3>{inquiry.propertyTitle}</h3>
                                <div className="inquiry-meta">
                                    <span>👤 {inquiry.userName}</span>
                                    <span>📅 {new Date(inquiry.inquiryDate).toLocaleDateString()}</span>
                                    <span>🕐 {new Date(inquiry.inquiryDate).toLocaleTimeString()}</span>
                                </div>
                            </div>
                            <span className={`status-badge ${inquiry.ownerReply ? 'status-replied' : 'status-pending'}`}>
                                {inquiry.ownerReply ? 'Replied' : 'Pending'}
                            </span>
                        </div>

                        <div className="inquiry-message">
                            <p><strong>Message:</strong></p>
                            <p>{inquiry.message}</p>
                        </div>

                        {inquiry.ownerReply ? (
                            <div className="reply-section">
                                <h4>Owner Reply:</h4>
                                <p>{inquiry.ownerReply}</p>
                                <div className="reply-date">
                                    Replied on {new Date(inquiry.replyDate).toLocaleString()}
                                </div>
                            </div>
                        ) : (
                            <>
                                {replyForms[inquiry.inquiryId] ? (
                                    <div className="reply-form">
                                        <textarea 
                                            placeholder="Type your reply here..."
                                            value={replyTexts[inquiry.inquiryId] || ''}
                                            onChange={(e) => handleReplyChange(inquiry.inquiryId, e.target.value)}
                                        />
                                        <div className="action-buttons">
                                            <button 
                                                className="btn btn-primary" 
                                                onClick={() => submitReply(inquiry.inquiryId)}
                                            >
                                                Send Reply
                                            </button>
                                            <button 
                                                className="btn btn-secondary" 
                                                onClick={() => cancelReply(inquiry.inquiryId)}
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="action-buttons">
                                        <button 
                                            className="btn btn-reply" 
                                            onClick={() => showReplyForm(inquiry.inquiryId)}
                                        >
                                            Reply to Inquiry
                                        </button>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                ))
            )}
        </div>
    );
};

export default PropertyInquiries;