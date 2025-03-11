document.addEventListener('DOMContentLoaded', function() {
    // 获取DOM元素
    const sidebar = document.getElementById('sidebar');
    const menuBtn = document.getElementById('menu-btn');
    const closeSidebarBtn = document.getElementById('close-sidebar');
    const chatMessages = document.getElementById('chat-messages');
    const messageInput = document.getElementById('message-input');
    const sendBtn = document.getElementById('send-btn');
    const chatItems = document.querySelectorAll('.chat-item');
    const productCards = document.querySelectorAll('.product-card');
    const viewDetailBtns = document.querySelectorAll('.view-detail-btn');
    const galleryImages = document.querySelectorAll('.image-gallery img');
    
    // 移动端侧边栏切换
    if (menuBtn) {
        menuBtn.addEventListener('click', function() {
            sidebar.classList.add('active');
        });
    }
    
    if (closeSidebarBtn) {
        closeSidebarBtn.addEventListener('click', function() {
            sidebar.classList.remove('active');
        });
    }
    
    // 聊天历史项点击事件
    chatItems.forEach(item => {
        item.addEventListener('click', function() {
            // 移除所有活跃状态
            chatItems.forEach(i => i.classList.remove('active'));
            // 添加当前项活跃状态
            this.classList.add('active');
            
            // 在移动端点击后关闭侧边栏
            if (window.innerWidth <= 768) {
                sidebar.classList.remove('active');
            }
            
            // 这里可以添加加载对应聊天记录的逻辑
            const chatTitle = this.querySelector('h3').textContent;
            document.querySelector('.chat-header h2').textContent = chatTitle;
            
            // 模拟加载聊天记录
            // 实际应用中，这里应该从服务器获取聊天记录
        });
    });
    
    // 发送消息功能
    function sendMessage() {
        const messageText = messageInput.value.trim();
        if (!messageText) return;
        
        // 创建用户消息元素
        const userMessageDiv = document.createElement('div');
        userMessageDiv.className = 'message user-message';
        
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const timeString = `${hours}:${minutes}`;
        
        userMessageDiv.innerHTML = `
            <div class="message-content">
                <p>${messageText}</p>
            </div>
            <span class="message-time">${timeString}</span>
        `;
        
        // 添加到聊天区域
        chatMessages.appendChild(userMessageDiv);
        
        // 清空输入框
        messageInput.value = '';
        
        // 滚动到底部
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // 模拟机器人回复
        setTimeout(() => {
            // 创建机器人消息元素
            const botMessageDiv = document.createElement('div');
            botMessageDiv.className = 'message bot-message';
            
            botMessageDiv.innerHTML = `
                <div class="message-content">
                    <p>我正在分析您的需求，请稍等...</p>
                </div>
                <span class="message-time">${timeString}</span>
            `;
            
            // 添加到聊天区域
            chatMessages.appendChild(botMessageDiv);
            
            // 滚动到底部
            chatMessages.scrollTop = chatMessages.scrollHeight;
            
            // 模拟加载时间后显示回复
            setTimeout(() => {
                // 更新机器人消息内容
                botMessageDiv.querySelector('p').textContent = '根据您的描述，我找到了一些相关商品，您可以看看是否符合您的需求：';
                
                // 模拟产品推荐
                // 实际应用中，这里应该根据用户输入调用GPT分析，然后从服务器获取推荐产品
                const demoProductsHTML = `
                    <div class="product-cards">
                        <div class="product-card">
                            <div class="product-image">
                                <img src="https://via.placeholder.com/150x200" alt="商品图片">
                                <span class="product-price">¥129</span>
                            </div>
                            <div class="product-info">
                                <h4>商品推荐示例</h4>
                                <p>这是根据您的需求推荐的商品</p>
                                <div class="product-meta">
                                    <span class="shop-name">示例店铺</span>
                                    <span class="sales">月销1000+</span>
                                </div>
                                <button class="view-detail-btn">查看详情</button>
                            </div>
                        </div>
                    </div>
                `;
                
                // 在机器人消息后添加产品卡片
                chatMessages.insertAdjacentHTML('beforeend', demoProductsHTML);
                
                // 为新添加的按钮绑定事件
                document.querySelectorAll('.view-detail-btn').forEach(btn => {
                    if (!btn.hasListener) {
                        btn.addEventListener('click', handleProductDetail);
                        btn.hasListener = true;
                    }
                });
                
                // 滚动到底部
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }, 1500);
        }, 800);
    }
    
    // 发送按钮点击事件
    if (sendBtn) {
        sendBtn.addEventListener('click', sendMessage);
    }
    
    // 输入框回车发送
    if (messageInput) {
        messageInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                sendMessage();
            }
        });
    }
    
    // 产品详情按钮点击事件
    function handleProductDetail() {
        const productName = this.closest('.product-info').querySelector('h4').textContent;
        alert(`查看商品详情: ${productName}`);
        // 实际应用中，这里应该跳转到商品详情页或展开更多信息
    }
    
    // 为产品卡片中的按钮绑定事件
    viewDetailBtns.forEach(btn => {
        btn.addEventListener('click', handleProductDetail);
    });
    
    // 图片画廊点击事件
    galleryImages.forEach(img => {
        img.addEventListener('click', function() {
            // 创建大图预览
            const overlay = document.createElement('div');
            overlay.className = 'image-overlay';
            overlay.style.position = 'fixed';
            overlay.style.top = '0';
            overlay.style.left = '0';
            overlay.style.width = '100%';
            overlay.style.height = '100%';
            overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
            overlay.style.display = 'flex';
            overlay.style.alignItems = 'center';
            overlay.style.justifyContent = 'center';
            overlay.style.zIndex = '1000';
            
            const largeImg = document.createElement('img');
            largeImg.src = this.src.replace('120x160', '300x400'); // 假设有更大的图片
            largeImg.style.maxWidth = '90%';
            largeImg.style.maxHeight = '90%';
            largeImg.style.borderRadius = '8px';
            
            overlay.appendChild(largeImg);
            document.body.appendChild(overlay);
            
            // 点击关闭大图预览
            overlay.addEventListener('click', function() {
                document.body.removeChild(overlay);
            });
        });
    });
    
    // 初始滚动到底部
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    // 响应式处理
    function handleResize() {
        if (window.innerWidth > 768) {
            sidebar.classList.remove('active');
        }
    }
    
    window.addEventListener('resize', handleResize);
}); 