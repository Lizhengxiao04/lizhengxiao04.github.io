// 缓动函数: 提供了非线性的平滑过渡效果 (easeInOutCubic)
function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

/**
 * 平滑滚动到指定位置
 * @param {number} targetPosition 目标滚动位置（像素）
 * @param {number} duration 动画持续时间（毫秒）
 */
function smoothScrollTo(targetPosition, duration) {
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;

        // 计算动画进度，确保不超过 1
        const progress = Math.min(timeElapsed / duration, 1);

        // 应用非线性缓动效果
        const easedProgress = easeInOutCubic(progress);

        // 计算当前应滚动到的位置
        window.scrollTo(0, startPosition + distance * easedProgress);

        // 如果动画未结束，则请求下一帧
        if (timeElapsed < duration) {
            requestAnimationFrame(animation);
        }
    }

    requestAnimationFrame(animation);
}

/**
 * 复制文本到剪贴板并提供视觉反馈。
 * @param {string} text 要复制的文本内容。
 * @param {HTMLElement} button 触发复制操作的按钮元素。
 * @param {string} originalText 按钮的原始文本。
 * @param {string} originalClass 按钮的原始背景色类名。
 */
function copyToClipboard(text, button, originalText, originalClass) {
    // 1. 创建一个临时的 textarea 元素
    const tempInput = document.createElement('textarea');
    tempInput.value = text;

    // 隐藏元素，防止页面滚动或可见
    tempInput.style.position = 'fixed';
    tempInput.style.opacity = '0';
    document.body.appendChild(tempInput);

    // 2. 选中并执行复制命令
    tempInput.focus();
    tempInput.select();

    let successful = false;
    try {
        // 使用 document.execCommand('copy') 确保在 iFrame 环境中兼容性
        successful = document.execCommand('copy');
    } catch (err) {
        console.error('无法复制文本: ', err);
    }

    // 3. 移除临时元素
    document.body.removeChild(tempInput);

    // 4. 提供视觉反馈
    if (successful) {
        // 成功反馈：改变按钮样式和文本
        button.textContent = '✅ 已复制!';
        // 移除原有的 hover class，添加成功 class
        button.classList.remove('bg-main-blue', 'hover:bg-main-blue-dark');
        button.classList.add('bg-teal-500', 'hover:bg-teal-600');

        // 2秒后恢复原样
        setTimeout(() => {
            button.textContent = originalText;
            // 恢复原有的 class
            button.classList.remove('bg-teal-500', 'hover:bg-teal-600');
            button.classList.add(originalClass);
        }, 2000);
    } else {
        // 失败反馈 (如果需要)
        console.error('复制失败，请手动复制。');
    }
}


// --- 作品集数据 ---
const PROJECTS = [
    {
        title: "徐州工程学院招生宣传片",
        role: "副导演 / 剪辑与特效",
        image: "image/徐州工程学院.png",
        video: "video/徐州工程学院.mp4",
        description: "该项目作为徐州工程学院当年的核心招生宣传内容，旨在展现校园的青春活力和学术严谨性。我作为副导演和剪辑师，深度参与了从创意到交付的全过程。负责前期策划、撰写分镜头脚本、协调超过50名师生演员，并制定详细的拍摄时间表。后期使用 Premiere Pro 完成初剪和精修，利用 After Effects 制作片头 Logo 动画。最终影片获得了校领导的高度肯定，并在校内外媒体平台获得了高播放量。",
        tags: ["After Effects", "Premiere", "视听语言", "执行导演", "特效合成"],
        link: "https://ug.link/linn04/filemgr/share-download/?id=548dc9df20a54813ad13c1bb3f0e0f3e"
    },
    {
        title: "星迷宇宙游戏宣传片",
        role: "商业剪辑师",
        image: "image/新华能阔.png",
        video: "video/星迷宇宙 - 01.mp4",
        description: `与新华能阔深度合作，为其科幻题材游戏《星迷宇宙 · 亿万宇宙》打造官方宣传片。基于客户提供的创意脚本与游戏素材，我全程负责创意剪辑、节奏把控与视觉呈现，重点突出游戏宏大的宇宙世界观、震撼的视觉特效与创新的核心玩法。

在项目执行中，我建立了高效的客户沟通机制，通过3轮demo迭代与精细化调整，最终交付的宣传片完全符合客户预期，获得高度认可。该宣传片成功提升了游戏的市场曝光度，助力产品推广取得显著效果。`,
        tags: ["Final Cut Pro", "PR", "商业项目", "客户沟通", "创意剪辑"],
        link: "https://ug.link/linn04/filemgr/share-download/?id=11f05ae9c3ae482caf3cdba6bc0efce9"
    },
    {
        title: "新媒体视觉传达中心",
        role: "视觉传达部部长",
        image: "image/校大学生新媒体工作室/1.jpg",
        images: [
            "image/校大学生新媒体工作室/1.jpg",
            "image/校大学生新媒体工作室/2.jpg",
            "image/校大学生新媒体工作室/3.jpg",
            "image/校大学生新媒体工作室/4.jpg",
            "image/校大学生新媒体工作室/5.jpg",
            "image/校大学生新媒体工作室/6.jpg",
            "image/校大学生新媒体工作室/7.jpg"
        ],
        description: "担任校大学生新媒体工作室的视觉传达部部长，负责部门的日常组织管理和对外协调工作。主要工作包括主持跨部门活动的视觉设计（海报、宣传视频、KV设计），优化团队内部协作流程，并定期对新成员进行专业培训。通过优化工作流，显著提升了校级活动的视觉宣传效率和质量。",
        tags: ["组织管理", "团队协作", "视觉策划", "活动支持", "领导力"],
        link: "https://mp.weixin.qq.com/s/iHYsCjaOiXE2WPyt9Gj37A" // 微信公众号文章链接
    },
    {
        title: "党支部活动及会议记录",
        role: "摄影摄像",
        image: "image/党支部活动及会议记录/9.JPG",
        images: [
            "image/党支部活动及会议记录/1.JPG",
            "image/党支部活动及会议记录/2.JPG",
            "image/党支部活动及会议记录/3.JPG",
            "image/党支部活动及会议记录/4.JPG",
            "image/党支部活动及会议记录/5.JPG",
            "image/党支部活动及会议记录/6.JPG",
            "image/党支部活动及会议记录/7.JPG",
            "image/党支部活动及会议记录/8.JPG",
            "image/党支部活动及会议记录/9.JPG"
        ],
        description: `承担党支部系列活动及重要会议的全程摄影摄像工作，以高度的政治责任感和专业素养保障影像记录质量：

• 会前筹备阶段：提前勘察场地环境，根据会议议程与场地布局规划科学合理的拍摄机位，精心调试摄影摄像设备，确保所有器材处于最佳工作状态，为高质量拍摄奠定基础。

• 会中记录阶段：严格遵循党组织活动记录规范，精准捕捉会议全程画面，重点聚焦领导讲话、集体学习、民主评议、表决通过等关键环节，以稳定的构图、画质清晰完整还原会议的庄重氛围与重要瞬间。

• 后期处理阶段：及时对拍摄素材进行筛选、分类与专业修图优化，按照档案管理要求完成素材的规范命名、整理归档与按需交付，为党支部活动的留痕存档、宣传报道与后续总结提供了高质量的影像支撑。

通过专业细致的工作，确保了党支部各项活动记录的完整性、规范性与专业性，为党组织工作的开展提供了有力的影像保障。`,

        tags: ["摄影", "摄像"]
    }
];

// --- Modal Control Functions ---
const modal = document.getElementById('project-modal');
const modalTitle = document.getElementById('modal-title');
const modalRole = document.getElementById('modal-role');
const modalImage = document.getElementById('modal-image');
const modalDescription = document.getElementById('modal-description');
const modalTags = document.getElementById('modal-tags');
const modalLink = document.getElementById('modal-link');
const CAROUSEL_INTERVAL = 4000; // ms

let carouselTimer = null;
let carouselImages = [];
let carouselIndex = 0;

// 停止轮播定时器（不清除数据，用于暂停/重启）
function stopCarousel() {
    if (carouselTimer) {
        clearInterval(carouselTimer);
        carouselTimer = null;
    }
}

// 完整重置轮播状态（关闭/切换项目时使用）
function resetCarouselState() {
    stopCarousel();
    carouselImages = [];
    carouselIndex = 0;
}

// 初始化轮播内容
function initCarousel(images, title) {
    const mediaPlaceholder = document.getElementById('modal-media-placeholder');
    if (!mediaPlaceholder || !images?.length) return;

    mediaPlaceholder.innerHTML = `
        <div id="carousel-wrapper" class="relative w-full h-full">
            <img id="carousel-image" src="${images[0]}" onerror="this.onerror=null;this.src='https://placehold.co/800x450/ECFDF5/059669?text=Image+Unavailable';" alt="${title} 第1张" class="w-full h-full object-cover">
            <button id="carousel-prev" class="absolute top-1/2 -translate-y-1/2 left-3 bg-black/40 text-white p-2 rounded-full hover:bg-black/60 transition">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m15 19-7-7 7-7" />
                </svg>
            </button>
            <button id="carousel-next" class="absolute top-1/2 -translate-y-1/2 right-3 bg-black/40 text-white p-2 rounded-full hover:bg-black/60 transition">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m9 5 7 7-7 7" />
                </svg>
            </button>
            <div id="carousel-dots" class="absolute bottom-3 left-0 right-0 flex justify-center gap-2"></div>
        </div>
    `;

    carouselImages = images;
    carouselIndex = 0;

    const imageEl = document.getElementById('carousel-image');
    const dotsContainer = document.getElementById('carousel-dots');
    dotsContainer.innerHTML = images.map((_, idx) =>
        `<span data-idx="${idx}" class="w-2.5 h-2.5 rounded-full border border-white/70 ${idx === 0 ? 'bg-white' : 'bg-white/50'} cursor-pointer transition"></span>`
    ).join('');

    const dots = Array.from(dotsContainer.querySelectorAll('span'));

    function renderDots() {
        dots.forEach((dot, idx) => {
            dot.classList.toggle('bg-white', idx === carouselIndex);
            dot.classList.toggle('bg-white/50', idx !== carouselIndex);
        });
    }

    function showSlide(targetIndex) {
        if (!carouselImages.length) return;
        carouselIndex = (targetIndex + carouselImages.length) % carouselImages.length;
        imageEl.onerror = null; // 重置onerror处理
        imageEl.src = carouselImages[carouselIndex];
        imageEl.alt = `${title} 第${carouselIndex + 1}张`;
        // 添加onerror处理，确保切换图片时也能处理错误
        imageEl.onerror = function() {
            this.onerror = null;
            this.src = 'https://placehold.co/800x450/ECFDF5/059669?text=Image+Unavailable';
        };
        renderDots();
    }

    function restartAuto() {
        stopCarousel();
        carouselTimer = setInterval(() => showSlide(carouselIndex + 1), CAROUSEL_INTERVAL);
    }

    const prevBtn = document.getElementById('carousel-prev');
    const nextBtn = document.getElementById('carousel-next');
    prevBtn?.addEventListener('click', () => {
        showSlide(carouselIndex - 1);
        restartAuto();
    });
    nextBtn?.addEventListener('click', () => {
        showSlide(carouselIndex + 1);
        restartAuto();
    });

    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            const idx = Number(dot.dataset.idx ?? 0);
            showSlide(idx);
            restartAuto();
        });
    });

    const wrapper = document.getElementById('carousel-wrapper');
    wrapper?.addEventListener('mouseenter', stopCarousel);
    wrapper?.addEventListener('mouseleave', restartAuto);

    showSlide(0);
    restartAuto();
}

// 确保模态框关闭时恢复滚动并停止视频/轮播
function closeProjectModal() {
    // 停止视频播放
    const modalVideo = document.querySelector('#modal-media-placeholder video');
    if (modalVideo) {
        modalVideo.pause();
    }

    resetCarouselState();

    modal.classList.add('opacity-0', 'hidden');
    modal.classList.remove('opacity-100', 'flex');
    // 显式设置display属性确保模态框完全隐藏
    modal.style.display = 'none';
    document.body.style.overflow = ''; // 恢复主页面的滚动
}

// 打开模态框并填充数据
function openProjectModal(projectId) {
    const project = PROJECTS[projectId];
    if (!project) return;

    resetCarouselState();

    // 填充基本信息
    modalTitle.textContent = project.title;
    modalRole.textContent = project.role;
    modalDescription.textContent = project.description;

    const mediaPlaceholder = document.getElementById('modal-media-placeholder');
    // 填充标签
    modalTags.innerHTML = project.tags.map(tag =>
        `<span class="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">${tag}</span>`
    ).join('');

    // 设置链接 (如果存在)
    if (project.link && project.link !== '#') {
        modalLink.href = project.link;
        modalLink.classList.remove('hidden');
    } else {
        modalLink.classList.add('hidden');
    }

    // 填充媒体内容（轮播 / 视频 / 单张图）
    if (project.images && project.images.length) {
        initCarousel(project.images, project.title);
    } else if (project.video) {
        mediaPlaceholder.innerHTML = `<video src="${project.video}" class="w-full h-full object-cover" controls preload="metadata"></video>`;
    } else {
        mediaPlaceholder.innerHTML = `<img id="modal-image" src="${project.image}" class="w-full h-full object-cover" alt="项目：${project.title} 媒体">`;
    }

    // 显示模态框 - 确保正确切换显示状态
    modal.classList.remove('opacity-0', 'hidden');
    modal.classList.add('opacity-100', 'flex', 'justify-center');
    // 显式设置display属性确保模态框可见
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // 禁止主页面的滚动

    // 允许点击背景关闭
    modal.onclick = (e) => {
        if (e.target === modal) {
            closeProjectModal();
        }
    };
}

document.addEventListener('DOMContentLoaded', () => {
    // 滚动持续时间
    const SCROLL_DURATION = 800;
    // 获取吸顶导航栏的高度，用于抵消滚动位置，防止内容被遮挡
    const headerHeight = document.getElementById('main-header').offsetHeight;

    // 选择所有带有 data-target 属性的链接
    const scrollLinks = document.querySelectorAll('a[data-target]');

    // 监听所有导航链接的点击事件
    scrollLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('data-target');
            let targetPosition;

            if (targetId === 'top') {
                // 滚动到顶部
                targetPosition = 0;
            } else {
                // 滚动到指定 ID 元素
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    // 目标位置 = 元素距离顶部位置 - 导航栏高度
                    targetPosition = targetElement.offsetTop - headerHeight;
                } else {
                    console.error(`目标ID '${targetId}' 未找到.`);
                    return;
                }
            }
            smoothScrollTo(targetPosition, SCROLL_DURATION);
        });
    });

    // 监听"回到顶部"按钮的点击事件
    const scrollTopButton = document.getElementById('scroll-to-top');
    if (scrollTopButton) {
        scrollTopButton.addEventListener('click', (e) => {
            e.preventDefault();
            smoothScrollTo(0, SCROLL_DURATION);
        });
    }

    // 筛选项目卡片
    function filterProjects(filter) {
        const cards = document.querySelectorAll('.project-card');
        const buttons = document.querySelectorAll('.filter-btn');

        // 重置所有按钮样式
        buttons.forEach(btn => {
            btn.classList.remove('bg-main-blue', 'text-white', 'active');
            btn.classList.add('bg-white', 'border', 'border-gray-300', 'text-gray-600');
        });

        // 设置当前激活按钮样式
        const activeBtn = document.querySelector(`[data-filter="${filter}"]`);
        if (activeBtn) {
            activeBtn.classList.remove('bg-white', 'border', 'border-gray-300', 'text-gray-600');
            activeBtn.classList.add('bg-main-blue', 'text-white', 'active');
        }

        // 第一步：所有卡片先统一淡出
        cards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'scale(0.95)';
        });

        // 第二步：在淡出完成后，显示符合条件的卡片
        setTimeout(() => {
            cards.forEach((card) => {
                const isVideo = card.classList.contains('video-project');
                const isOrganization = card.classList.contains('organization-project');

                let shouldShow = false;

                // 检查卡片类型
                const isPhotography = card.classList.contains('photography-project');

                if (filter === 'all') {
                    shouldShow = true;
                } else if (filter === 'video') {
                    shouldShow = isVideo;
                } else if (filter === 'organization') {
                    shouldShow = isOrganization;
                } else if (filter === 'photography') {
                    shouldShow = isPhotography;
                }

                if (shouldShow) {
                    // 先设置为显示状态，然后触发淡入动画
                    card.style.display = 'block';
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.95)';

                    // 确保动画流畅
                    requestAnimationFrame(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    });
                } else {
                    // 不符合条件的卡片保持隐藏
                    card.style.display = 'none';
                }
            });
        }, 150); // 与淡出动画时长一致
    }

    // 筛选按钮事件监听
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter');
            filterProjects(filter);
        });
    });

    // --- Mobile Menu Logic ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            // 切换菜单图标
            const svg = mobileMenuButton.querySelector('svg');
            if (mobileMenu.classList.contains('hidden')) {
                // 显示菜单图标
                svg.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />';
            } else {
                // 显示关闭图标
                svg.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />';
            }
        });

        // 点击移动菜单链接后关闭菜单
        const mobileMenuLinks = mobileMenu.querySelectorAll('a');
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                // 恢复菜单图标
                const svg = mobileMenuButton.querySelector('svg');
                svg.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />';
            });
        });
    }
    // --- End Mobile Menu Logic ---

    // --- Contact Copy Logic ---
    const copyButtons = document.querySelectorAll('.copy-btn');

    copyButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const textToCopy = button.getAttribute('data-copy-text');

            // 获取原始文本和样式类
            const originalText = '点击复制';
            const originalClass = 'bg-main-blue hover:bg-main-blue-dark';

            if (textToCopy) {
                copyToClipboard(textToCopy, button, originalText, originalClass);
            }
        });
    });
    // --- End Contact Copy Logic ---
});
