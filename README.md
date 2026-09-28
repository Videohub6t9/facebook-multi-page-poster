<!DOCTYPE html>
<html lang="bn">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Facebook Multi-Page Poster</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="container-fluid">
        <div class="row">
            <!-- Sidebar -->
            <div class="col-md-3 bg-light sidebar">
                <div class="p-4">
                    <h3 class="mb-4">📱 Pages</h3>
                    <div id="pagesContainer" class="pages-list">
                        <p class="text-muted">লোডিং হচ্ছে...</p>
                    </div>
                </div>
            </div>

            <!-- Main Content -->
            <div class="col-md-9">
                <div class="header bg-primary text-white p-3">
                    <div class="d-flex justify-content-between align-items-center">
                        <h2>🚀 Facebook Multi-Page Poster</h2>
                        <button id="logoutBtn" class="btn btn-light">Logout</button>
                    </div>
                </div>

                <div class="p-4">
                    <!-- Tabs -->
                    <ul class="nav nav-tabs mb-4" id="mainTabs">
                        <li class="nav-item">
                            <a class="nav-link active" id="postTab" data-bs-toggle="tab" href="#postSection">পোস্ট করুন</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" id="storyTab" data-bs-toggle="tab" href="#storySection">Story করুন</a>
                        </li>
                    </ul>

                    <!-- Post Section -->
                    <div class="tab-content">
                        <div class="tab-pane fade show active" id="postSection">
                            <form id="postForm" class="post-form">
                                <div class="mb-3">
                                    <label for="postCaption" class="form-label">ক্যাপশন লিখুন</label>
                                    <textarea id="postCaption" class="form-control" rows="4" placeholder="আপনার ক্যাপশন এখানে লিখুন..."></textarea>
                                </div>

                                <div class="mb-3">
                                    <label for="postMedia" class="form-label">ছবি বা ভিডিও নির্বাচন করুন</label>
                                    <input type="file" id="postMedia" class="form-control" accept="image/*,video/*" required>
                                    <small class="text-muted">ছবি বা ভিডিও সর্বোচ্চ 50MB হতে পারে</small>
                                </div>

                                <div class="mb-3">
                                    <label class="form-label">নির্বাচিত Pages:</label>
                                    <div id="selectedPagesPost" class="alert alert-info">
                                        কোনো Page নির্বাচন করা হয়নি
                                    </div>
                                </div>

                                <button type="submit" class="btn btn-success btn-lg w-100">
                                    📤 সব Page-এ পোস্ট করুন
                                </button>
                            </form>

                            <!-- Result Section -->
                            <div id="postResults" class="mt-4" style="display: none;">
                                <h4>ফলাফল:</h4>
                                <div id="postResultsList" class="result-list"></div>
                            </div>
                        </div>

                        <!-- Story Section -->
                        <div class="tab-pane fade" id="storySection">
                            <form id="storyForm" class="story-form">
                                <div class="mb-3">
                                    <label for="storyCaption" class="form-label">Story ক্যাপশন (Optional)</label>
                                    <input type="text" id="storyCaption" class="form-control" placeholder="আপনার ক্যাপশন এখানে লিখুন...">
                                </div>

                                <div class="mb-3">
                                    <label for="storyMedia" class="form-label">ছবি বা ভিডিও নির্বাচন করুন</label>
                                    <input type="file" id="storyMedia" class="form-control" accept="image/*,video/*" required>
                                    <small class="text-muted">ছবি বা ভিডিও সর্বোচ্চ 50MB হতে পারে</small>
                                </div>

                                <div class="mb-3">
                                    <label class="form-label">নির্বাচিত Pages:</label>
                                    <div id="selectedPagesStory" class="alert alert-info">
                                        কোনো Page নির্বাচন করা হয়নি
                                    </div>
                                </div>

                                <button type="submit" class="btn btn-warning btn-lg w-100">
                                    📸 সব Page-এ Story করুন
                                </button>
                            </form>

                            <!-- Result Section -->
                            <div id="storyResults" class="mt-4" style="display: none;">
                                <h4>ফলাফল:</h4>
                                <div id="storyResultsList" class="result-list"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script src="app.js"></script>
</body>
</html>
