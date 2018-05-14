// 20180510154230
// https://smohan.net/api/posts

var data = [
  {
    "_id": "59b2c5e00dcd3220659f1b32",
    "thumbnail": "//img.smohan.net/671633a320fe5048522abe8ca4d3d2dd.jpg",
    "excerpt": "本文着重介绍CSS的伪类和伪选择器，讲解了伪类和伪选择器的区别，用`:valid`和`:invalid`来做表单即时校验，用`:target`来实现折叠面板，用`:not`来排除其他选择器，用`:nth-child(even/odd)`来实现隔行变色，用`::selection`来美化选中文本，用`::placeholder`来美化占位符，用`::first-letter`来实现段落首字下沉，用`::first-line`来特殊标记段落第一行",
    "alias": "tr6bta",
    "title": "你不知道的CSS（三）",
    "summary": "<p>在前面两篇文章《<a href=\"https://smohan.net/blog/6gr77h\">你不知道的CSS（一）</a>》和《<a href=\"https://smohan.net/blog/farjdx\">你不知道的CSS（二）</a>》中大致介绍了一些CSS方面比较隐晦的但又很实用的技巧。相信这些技巧会为大家在项目实践中带来一定的帮助，本文作为《你不知道的CSS》系列的第三篇文章，将继续在CSS技巧方面进行探讨，不同于前两篇的是，本文将着重介绍CSS中伪类和伪元素在项目中的应用场景。伪类相信大家最熟悉也是用的最多的莫过于<code>:hover</code>, <code>:active</code>, <code>:focus</code>之类的，因为这些在平常的项目中太常用了（然而我目前依然见过还有用js去添加<code>.hover</code>类来变化背景色的同学😴）。而伪元素如<code>:before</code>, <code>:after</code>相信大家也用的烂熟了。 当然对于比较常见的伪类（元素）不在本文的讨论范围类，本文主要介绍一些<strong>生僻的但是又非常实用的</strong>伪类(元素)。CSS的世界已经变天了，抛开过去，拥抱变化吧~</p>\n",
    "allowReward": true,
    "top": false,
    "updateTime": "2017-09-20T13:14:06.312Z",
    "createTime": "2017-09-08T15:26:03.896Z",
    "copyright": {
      "author": "smohan",
      "source": "//smohan.net/",
      "belong": "original"
    },
    "allowComment": true,
    "count": {
      "downloads": 0,
      "praises": 13,
      "comments": 6,
      "views": 978
    },
    "tags": [
      "css3",
      "sass",
      "伪类",
      "伪选择器"
    ],
    "category": {
      "name": "前端开发",
      "path": "580e36616dd7c320d45984aa",
      "id": "580e36616dd7c320d45984aa"
    }
  },
  {
    "_id": "59b173276de7aa2352949694",
    "thumbnail": "//img.smohan.net/671633a320fe5048522abe8ca4d3d2dd.jpg",
    "excerpt": "这一篇中将主要介绍未知高度容器的多种垂直居中方法，包括伪元素占位法，absolute + transform，table-cell，基于flex的等5个方案；用counter来模拟/装饰有序清单；用table-layout来控制表格单元格宽度；用caret-color来自定义光标的样式；用user-select来禁用文本选中",
    "alias": "farjdx",
    "title": "你不知道的CSS（二）",
    "summary": "<p>在上文《<a href=\"https://smohan.net/blog/6gr77h\">你不知道的CSS（一）</a>》中，介绍了兄弟选择器美化表单，<code>font-size:0</code>消除间隙，<code>overflow</code>清除浮动，<code>border</code>绘制三角形等7个实用技巧。由于文章长度限制，还遗留了一些技巧没有介绍，考虑到日后可能会有更多的技巧需要补充进来，便将上文改名为你不知道的CSS（一），名字其实有点浮夸，希望能完善为一个系列，也希望该系列中介绍的技巧能够帮助到更多人解决实际开发中遇到的问题。在这里感谢<a href=\"https://segmentfault.com/a/1190000010993048\">SegmentFault</a>的小编在<a href=\"http://weibo.com/2036070420/FkoZcatlp?type=comment#_rnd1504705715564\">微博上</a>的推荐。本文将<strong>重点介绍CSS中未知高度容器的垂直居中</strong>技巧。同样每个技巧将结合demo或者图示来说明（如果demo无法打开，请自备梯子，原因你懂得🙀）。</p>\n",
    "allowReward": true,
    "top": false,
    "updateTime": "2017-09-15T16:19:28.280Z",
    "createTime": "2017-09-04T13:29:13.956Z",
    "copyright": {
      "author": "smohan",
      "source": "//smohan.net/",
      "belong": "original"
    },
    "allowComment": true,
    "count": {
      "downloads": 0,
      "praises": 17,
      "comments": 3,
      "views": 2086
    },
    "tags": [
      "css3",
      "css",
      "技巧",
      "scss"
    ],
    "category": {
      "name": "前端开发",
      "path": "580e36616dd7c320d45984aa",
      "id": "580e36616dd7c320d45984aa"
    }
  },
  {
    "_id": "59831f34e20c3f1374ab9d66",
    "thumbnail": "//img.smohan.net/671633a320fe5048522abe8ca4d3d2dd.jpg",
    "excerpt": "CSS的世界是神奇的。整理了一些实用的CSS技巧，来解决我们在实际项目开发中遇到的的问题。技巧如：用~ / + 兄弟选择器来美化表单元素；用font-size：0来清除间距；用 overflow 來清除浮动；用border来绘制三角形；用垂直方向的padding来实现等比缩放的盒子；用pointer-event来禁用事件；用max-width来防止图片撑破容器；用伪类来显示打印时a标签的链接",
    "alias": "6gr77h",
    "title": "你不知道的CSS（一）",
    "summary": "<p>CSS的世界是神奇的。<br>随着各浏览器WEB标准的日趋统一，CSS在WEB世界中扮演的角色也愈发的重要。甚至于在GitHub上出现了<a href=\"https://github.com/you-dont-need/You-Dont-Need-JavaScript\">You-Dont-Need-JavaScript</a>这样Star近万的优秀开源项目，抛开该项目的实用性不说，项目中的众多的DEMO就已经证明了CSS的强大。<br>当然，这篇文章不是为了介绍这个项目，而是整理了一些实用的CSS技巧，来解决我们在实际项目开发中遇到的的问题。文章也会长期更新，总结更多的技巧。每个技巧将结合demo或者图示来说明（如果demo无法打开，请自备梯子，原因你懂得🙀）。也许你此刻正在发愁的一个bug可以在这里找到答案😆。</p>\n",
    "allowReward": true,
    "top": false,
    "updateTime": "2017-09-14T13:13:47.159Z",
    "createTime": "2017-08-03T12:59:01.809Z",
    "copyright": {
      "author": "smohan",
      "source": "//smohan.net/",
      "belong": "original"
    },
    "allowComment": true,
    "count": {
      "downloads": 0,
      "praises": 43,
      "comments": 0,
      "views": 4165
    },
    "tags": [
      "css3",
      "sass",
      "css技巧"
    ],
    "category": {
      "name": "前端开发",
      "path": "580e36616dd7c320d45984aa",
      "id": "580e36616dd7c320d45984aa"
    }
  },
  {
    "_id": "5aca29dfc62051368fc1d00a",
    "title": "前端魔法堂——异常不仅仅是try/catch",
    "alias": "kr6yu1",
    "excerpt": "异常还是错误？它会如何影响我们的代码？内置异常类型有哪些？捕获“同步代码”中的\"运行时异常\"，用try/catch就够了。\"万能\"异常捕获者window.onerror，真的万能吗？Promise.reject也抛异常，怎么办？404等网络请求异常真心要后之后觉吗？",
    "thumbnail": "//img.smohan.net/c7923a14c1475f2a0880c690eaf3dc29.jpg",
    "top": false,
    "allowReward": true,
    "summary": "<p>编程时我们往往拿到的是业务流程正确的业务说明文档或规范，但实际开发中却布满荆棘和例外情况，而这些例外中包含业务用例的例外，也包含技术上的例外。对于业务用例的例外我们别无它法，必须要求实施人员与用户共同提供合理的解决方案；而技术上的例外，则必须由我们码农们手刃之，而这也是我想记录的内容。<br>我打算分成《<a href=\"https://www.cnblogs.com/fsjohnhuang/p/7685144.html\">前端魔法堂——异常不仅仅是try/catch</a>》和《<a href=\"http://www.cnblogs.com/fsjohnhuang/p/7729527.html\">前端魔法堂——调用栈，异常实例中的宝藏</a>》两篇分别叙述内置/自定义异常类，捕获运行时异常/语法异常/网络请求异常/PromiseRejection事件，什么是调用栈和如何获取调用栈的相关信息。<br>是不是未出发就已经很期待呢？好吧，大家捉紧扶手，老司机要开车了^_^ </p>\n",
    "updateTime": "2018-04-08T15:21:44.567Z",
    "createTime": "2018-04-08T14:40:31.698Z",
    "copyright": {
      "author": "肥仔John",
      "source": "https://www.cnblogs.com/fsjohnhuang/p/7685144.html",
      "belong": "reprint"
    },
    "allowComment": true,
    "count": {
      "downloads": 0,
      "praises": 4,
      "comments": 0,
      "views": 34
    },
    "tags": [
      "java",
      "异常",
      "error",
      "try-catch"
    ],
    "category": {
      "name": "他山之石",
      "path": "580e36a66dd7c320d45984b0",
      "id": "580e36a66dd7c320d45984b0"
    }
  },
  {
    "_id": "5a9554c6c62051368fc1cfde",
    "title": "在原生CSS中使用变量",
    "alias": "w0incg",
    "excerpt": "CSS 变量是由CSS作者定义的实体，其中包含要在整个文档中重复使用的特定值。使用自定义属性来设置变量名，并使用特定的 var() 来访问。css变量使用--开头；css变量分为全局变量和局部变量",
    "thumbnail": "//img.smohan.net/a713d933ff8bd8f28794e237c3d920ec.jpg",
    "top": false,
    "allowReward": true,
    "summary": "<p>一直以来，CSS作为一种申明式的样式标记语言，很难像如<code>javascript</code>等命令式编程语言一样通过定义和使用变量的方式来维护和追踪某些状态。后来随着<code>scss</code>,<code>less</code>等CSS预处理器的出现，我们可以像优秀的开源框架<code>bootstrap</code>那样，通过维护一个<a href=\"https://github.com/twbs/bootstrap/blob/v4-dev/scss/_variables.scss\"><code>_variables.scss</code></a>变量文件的方式来维护一个庞大的项目。但预处理需要编译，并非CSS原生支持。而现在，我们可以<strong>在原生CSS中使用变量了</strong>！</p>\n",
    "updateTime": "2018-04-08T15:28:47.421Z",
    "createTime": "2018-02-27T12:53:26.342Z",
    "copyright": {
      "author": "smohan",
      "source": "https://smohan.net",
      "belong": "original"
    },
    "allowComment": true,
    "count": {
      "downloads": 0,
      "praises": 2,
      "comments": 0,
      "views": 295
    },
    "tags": [
      "css3",
      "var",
      "variable"
    ],
    "category": {
      "name": "前端文档",
      "path": "580e36616dd7c320d45984aa#580e368b6dd7c320d45984ad",
      "id": "580e368b6dd7c320d45984ad"
    }
  },
  {
    "_id": "585561405684002ec0a0920d",
    "thumbnail": "//img.smohan.net/article/4b2344f9ab77bf4da1d48c2b2c6a0dd6.png",
    "excerpt": "Vue2.0利用vue-resource上传文件到七牛",
    "alias": "ygbey7",
    "title": "Vue2.0利用vue-resource上传文件到七牛",
    "summary": "<p>关于上传，总是有很多可以说道的。<br>16年底，公司项目<a href=\"https://fanqier.cn\">番茄表单</a>的前端部分，开始了从传统的<code>jquery</code>到<code>vue 2.0</code>的彻底重构。但是上传部分，无论是之前的传统版本，还是<code>Vue</code>新版本，都是在使用着<a href=\"https://github.com/mailru/FileAPI\">FileAPI</a>这款优秀的开源库，只是进行了简单的<code>directive</code>化。为什么呢？因为兼容性。没办法，公司项目不等同于个人项目，必须要考虑大多数浏览器。否则，上传部分完全可以利用<code>Vue-Resource</code>以及<code>FormData</code>来抛开对<a href=\"https://github.com/mailru/FileAPI\">FileAPI</a>的依赖。这让我深感遗憾，幸好这个简单的遗憾在个人博客<code>Vue</code>化重构的时候得以弥补。</p>\n",
    "allowReward": true,
    "top": false,
    "updateTime": "2017-08-23T16:22:02.931Z",
    "createTime": "2016-12-13T15:57:23.970Z",
    "copyright": {
      "source": "//smohan.net",
      "author": "smohan",
      "belong": "original"
    },
    "allowComment": true,
    "count": {
      "downloads": 0,
      "praises": 27,
      "comments": 3,
      "views": 5618
    },
    "tags": [
      "vue",
      "javascript",
      "webpack"
    ],
    "category": {
      "name": "学习笔记",
      "path": "580e36986dd7c320d45984ae",
      "id": "580e36986dd7c320d45984ae"
    }
  },
  {
    "_id": "5895773f8b462909388085ef",
    "thumbnail": "//img.smohan.net/article/93b1b5505ab2ae192b9544ec6c0f2c51.jpg",
    "excerpt": "Mongoose是在`node.js`环境下对`mongodb`进行便捷操作的对象模型工具。本文总结了mongoose简要的增删改查api",
    "alias": "b9rmng",
    "title": "Mongoose简要API",
    "summary": "<blockquote>\n<p>Mongoose是在<code>node.js</code>环境下对<code>mongodb</code>进行便捷操作的对象模型工具</p>\n</blockquote>\n<p>因此，要使用<code>mongoose</code>，则必须安装<code>node.js</code>环境以及<code>mongodb</code>数据库。mongoose使mongodb操作更简单便捷。可以在<a href=\"https://github.com/Automattic/mongoose\">github</a>中获得其源码，也可以在这里查看<a href=\"http://www.nodeclass.com/api/mongoose.html\">api文档</a>，英文的，文档内容较多，因此本文特意总结下<code>mongoose</code>的<code>schema</code>数据模型定义以及简单的增删改查api。</p>\n",
    "allowReward": true,
    "top": false,
    "updateTime": "2017-08-22T16:09:27.868Z",
    "createTime": "2017-02-04T06:35:02.116Z",
    "copyright": {
      "author": "smohan",
      "source": "//smohan.net",
      "belong": "original"
    },
    "allowComment": true,
    "count": {
      "downloads": 0,
      "praises": 11,
      "comments": 4,
      "views": 565
    },
    "tags": [
      "mongodb",
      "mongoose",
      "nodejs",
      "nginx"
    ],
    "category": {
      "name": "且行且冥",
      "path": "580e369f6dd7c320d45984af",
      "id": "580e369f6dd7c320d45984af"
    }
  },
  {
    "_id": "5884cdfc0bd6381f9cfd38ed",
    "thumbnail": "//img.smohan.net/project/5807b0d7d9fbb8ff71199154ecf12854.jpg",
    "excerpt": "一款基于HTML5以及CSS3的列表式音乐播放器，实现了音量控制、播放进度、播放时间以及播放模式的选择，上一曲、下一曲的控制。",
    "alias": "u3zxq1",
    "title": "HTML5音乐列表播放器SMusic开发总结",
    "summary": "<p>前段时间写过一篇介绍简单音乐播放器效果开发的博文《<a href=\"https://smohan.im/blog/tfw78q\">为你的博客添加简单的CSS3音乐播放器</a>》，实现了单曲循环播放效果，这个效果也是我的博客首页一直有的效果，同时文中也介绍了一些简单的<code>HTML5 Audio</code>标签的属性和方法，如 <code>play()</code> , <code>paused()</code>等。当然，之前的效果只适合诸如博客或者某个单页面（如专题页面）使用。而现在的可以称之为完整版的播放器弥补了之前的不足，增加了列表播放，音量控制，播放进度，播放时间以及播放模式，上一曲，下一曲等功能，除了歌词外，基本就是个播放器了（本来就是播放器）。</p>\n",
    "allowReward": true,
    "top": false,
    "updateTime": "2017-08-22T16:10:35.874Z",
    "createTime": "2015-05-17T15:10:32.833Z",
    "copyright": {
      "author": "smohan",
      "source": "//smohan.net",
      "belong": "original"
    },
    "allowComment": true,
    "count": {
      "downloads": 0,
      "praises": 134,
      "comments": 30,
      "views": 16193
    },
    "tags": [
      "audio",
      "javascript",
      "html5",
      "smusic",
      "css3"
    ],
    "category": {
      "name": "前端分享",
      "path": "580e36616dd7c320d45984aa#580e36836dd7c320d45984ac",
      "id": "580e36836dd7c320d45984ac"
    }
  },
  {
    "_id": "581b7fd48e2ca73f4c5623bc",
    "thumbnail": "//img.smohan.net/article/52f1f7fdcefa844bbd5d9a2b96bf03ef.jpg",
    "excerpt": "CSS3 Filter是W3C CSS filter Effect 1.0中定义的滤镜，一个使用CSS来改变图片和HTML的模糊度、亮度、对比度、饱和度等等效果的过滤器。",
    "alias": "5zls13",
    "title": "巧用CSS3滤镜实现图片不同渲染效果",
    "summary": "<p>本站在首页文章封面图从无色转变为有色，以及页面切换、发布留言等信息提示的背景模糊都利用到了css3的filter滤镜。</p>\n<blockquote>\n<p>CSS3 Filter是W3C CSS filter Effect 1.0中定义的滤镜，一个使用CSS来改变图片和HTML的模糊度、亮度、对比度、饱和度等等效果的过滤器。</p>\n</blockquote>\n<p>目前有<code>grayscale、blur、invert、saturate</code>等10个filter-function。<br>filter属性目前支持的浏览器较少，chrome，Firefox基本都支持了，IE只有EDGE(这个算IE吗)部分支持。具体兼容性请自行测试一下。这里的Demo在chrome（47.0.2526.80），Firefox（43）上测试通过。先来看一下<a href=\"http://caniuse.com/\">http://caniuse.com/</a>的兼容性评测：</p>\n",
    "allowReward": true,
    "top": false,
    "updateTime": "2017-08-22T16:13:52.810Z",
    "createTime": "2015-12-25T18:10:25.063Z",
    "copyright": {
      "author": "smohan",
      "source": "//smohan.net/",
      "belong": "original"
    },
    "allowComment": true,
    "count": {
      "downloads": 0,
      "praises": 16,
      "comments": 1,
      "views": 3579
    },
    "tags": [
      "css3",
      "filter",
      "滤镜"
    ],
    "category": {
      "name": "前端开发",
      "path": "580e36616dd7c320d45984aa",
      "id": "580e36616dd7c320d45984aa"
    }
  },
  {
    "_id": "5aae6c7ec62051368fc1cff6",
    "title": "这几年记在有道云笔记上的前端知识",
    "alias": "jc6gyl",
    "excerpt": "知识需要积累。\n打开有道云笔记，在前端目录中已经有约30多篇来自工作中，项目中或者书本中的知识点总结，大概看了一些，大部分都是JavaScript相关的知识点，css不多，这里筛选出一些来，按照时间顺序汇总分享出来。\n文章没有具体内容，也没有章节顺序，仅仅是一些知识点的碎片或者理论化的论点。\n",
    "thumbnail": "",
    "top": false,
    "allowReward": true,
    "summary": "<p>知识需要积累。</p>\n<p>打开有道云笔记，在前端目录中已经有约30多篇来自工作中，项目中或者书本中的知识点总结，大概看了一些，大部分都是JavaScript相关的知识点，css不多，这里筛选出一些来，按照时间顺序汇总分享出来。文章没有具体内容，也没有章节顺序，仅仅是一些知识点的碎片或者理论化的论点。时间跨度较长，可能有些知识已经过时或者本身总结过程中有错误或遗漏，请指正。</p>\n",
    "updateTime": "2018-04-08T15:25:49.410Z",
    "createTime": "2018-03-18T13:41:18.632Z",
    "copyright": {
      "author": "smohan",
      "source": "https://smohan.net",
      "belong": "original"
    },
    "allowComment": true,
    "count": {
      "downloads": 0,
      "praises": 3,
      "comments": 1,
      "views": 215
    },
    "tags": [
      "JavaScript",
      "有道云笔记",
      "前端"
    ],
    "category": {
      "name": "学习笔记",
      "path": "580e36986dd7c320d45984ae",
      "id": "580e36986dd7c320d45984ae"
    }
  },
  {
    "_id": "5a808c5bbbd5dc179f47c890",
    "title": "升级总结：phantomjs在Centos上的安装过程",
    "alias": "me7esu",
    "excerpt": "在centos7上安装prerender-spa-plugin时遇到phantomjs的诸多问题导致npm run build 失败，经过不断尝试，得出解决方案；可作为webpack 预编译模块prerender-spa-plugin的安装参考",
    "thumbnail": "//img.smohan.net/442e99750d2ca18f5876a3fa83f3a8a9.png",
    "top": false,
    "allowReward": true,
    "summary": "<p>想着在年前把博客更新升级一下，于是顺手修复了一些已知的BUG，优化了留言模块，升级了nginx，更是为了利于SEO，在webpack的编译中加入了<code>prerender-spa-plugin</code>预渲染模块。经本地window主机测试后，一切OK。这便着手在线上Linux主机中配置，nginx, node, mongod 等的升级一切顺利，但就是在项目中 <code>npm install</code> 的时候卡住了，而且这一卡就是一天多！难道是我安装姿势不对，需要起来重睡？ 查看<code>npm</code>报错原因，就出现在本文的主角<code>phantomjs</code>上。</p>\n<p>关于<code>phantomjs</code>，无论是在之前的项目中写单元测试，录制<code>UIrecorder</code>测试用例时都遇到过，但仅仅也是遇到而已，只以为仅仅是一个依赖模块，照着文档<code>npm install</code>一下，对其甚至连基本的了解都没有，于是问题就出现了。</p>\n",
    "updateTime": "2018-03-18T14:34:33.734Z",
    "createTime": "2018-02-11T17:57:23.269Z",
    "copyright": {
      "source": "https://smohan.net",
      "author": "smohan",
      "belong": "original"
    },
    "allowComment": true,
    "count": {
      "downloads": 0,
      "praises": 2,
      "comments": 0,
      "views": 223
    },
    "tags": [
      "centos",
      "nodejs",
      "linux",
      "phantomjs",
      "prerender-spa-plugin"
    ],
    "category": {
      "name": "且行且冥",
      "path": "580e369f6dd7c320d45984af",
      "id": "580e369f6dd7c320d45984af"
    }
  },
  {
    "_id": "599047704637b02c48ed4f5e",
    "thumbnail": "//img.smohan.net/c74232fa0d2667cce77d73acf68ff918.jpg",
    "excerpt": "clip-path直译过来就是裁剪路径，使用SVG或形状定义一个HTML元素的可见区域的方法。clip-path属性代替了现在已经弃用的剪切 clip属性，是SVG clip-path属性的延伸",
    "alias": "eutcdc",
    "title": "不可思议的CSS之clip-path",
    "summary": "<p>曾经和某位朋友在聊天中讨论过这样一个话题：综合90%的网站的布局以及页面中的元素不是方的，就是圆的。就像所有的颜色都是由三原色（<code>RGB</code>）构成的一样，所有规则的形状似乎也都是由方和圆组成的；抛开设计效果的好看与否不说，似乎不规则的设计在实现（CSS）成本上也是一个麻烦，毕竟在<code>CSS3</code>之前，我们实现一个圆都要切图，更何况那些复杂的多边形。好在<code>CSS3</code>时代的到来，尤其是<code>CSS3</code>在借鉴并增加了众多<code>SVG</code>属性的今天，使用纯<code>CSS</code>绘制一个多边形已经不再是什么难事。文章中要介绍的<code>clip-path</code>这个属性也是一个借鉴了<code>SVG</code>的<code>clipPath</code>的借鉴品（确切的说应该是css  <code>clip</code>属性（已被废弃）的替代品，svg <code>clip-path</code>属性的延伸品🙈）。</p>\n<p>",
    "allowReward": true,
    "top": false,
    "updateTime": "2018-04-08T15:02:40.723Z",
    "createTime": "2017-08-13T06:22:33.846Z",
    "copyright": {
      "source": "//smohan.net/",
      "author": "smohan",
      "belong": "original"
    },
    "allowComment": true,
    "count": {
      "downloads": 0,
      "praises": 3,
      "comments": 0,
      "views": 1147
    },
    "tags": [
      "css3",
      "clip-path",
      "clip",
      "svg",
      "scss"
    ],
    "category": {
      "name": "学习笔记",
      "path": "580e36986dd7c320d45984ae",
      "id": "580e36986dd7c320d45984ae"
    }
  },
  {
    "_id": "590d648ee43c6b4a6e71bc16",
    "thumbnail": "//img.smohan.net/article/7c15c2b8ea5af0a0ac5f76f5374b3c94.jpg",
    "excerpt": "Javascript中的强制类型转换总是返回标量基本类型值（String, Boolean, Number, Undefined, Null）。直白点就是Object.toString()或者Object.valueOf()的返回值。",
    "alias": "a8kngd",
    "title": "JAVASCRIPT学习笔记之强制类型转换",
    "summary": "<p>最近在读《你不知道的javascript》系列图书，收获蛮大，感慨也挺多的。<br>是的，关于javascript，你不是不知道，而是真的不知道。🐶<br>就比如类型转换，从开始到看完到第二第三第N遍，我经历了如下的心路历程：<br><strong>这有什么不知道的 → 一脸懵逼 →  有点意思 →  卧槽，怎么这样? →  原来是这样 →  靠，还是坑...</strong><br>真可谓是不学不知道，一学吓一跳。<br>为了避免再次入坑，这里做个总结，不，了结。</p>\n",
    "allowReward": true,
    "top": false,
    "updateTime": "2018-04-08T15:03:44.148Z",
    "createTime": "2017-05-06T05:13:12.237Z",
    "copyright": {
      "source": "//smohan.net",
      "author": "smohan",
      "belong": "original"
    },
    "allowComment": true,
    "count": {
      "downloads": 0,
      "praises": 7,
      "comments": 4,
      "views": 546
    },
    "tags": [
      "javascript",
      "类型转换",
      "==",
      "==="
    ],
    "category": {
      "name": "学习笔记",
      "path": "580e36986dd7c320d45984ae",
      "id": "580e36986dd7c320d45984ae"
    }
  },
  {
    "_id": "58bed88513cffc3af3a3dded",
    "thumbnail": "https://img.smohan.net/article/4b2344f9ab77bf4da1d48c2b2c6a0dd6.png",
    "excerpt": "分页是WEB开发中很常用的功能，尤其是在各种前后端分离的今天，后端API返回数据，前端计算分页页码并渲染到页面上已经是一个很普通很常见的功能了。这里使用Vue2来实现一个数据分页的组件",
    "alias": "pgk1qr",
    "title": "Vue实现一个分页组件",
    "summary": "<p>分页是WEB开发中很常用的功能，尤其是在各种前后端分离的今天，后端API返回数据，前端根据数据的<code>count</code>以及当前页码<code>pageIndex</code>来计算分页页码并渲染到页面上已经是一个很普通很常见的功能了。从最开始的<code>jquery</code>时代到现在的各种各样的前端框架时代，分页功能都是必不可少的。<br>分页大多数（基本上）情况下都是对异步数据列表的处理，这里首先需要明白一下分页的流程。<br>在已知每页显示数据量<code>pageSize</code>以及当前页码<code>pageIndex</code>的情况下：</p>\n",
    "allowReward": true,
    "top": false,
    "updateTime": "2018-04-08T15:03:17.501Z",
    "createTime": "2017-02-26T15:45:03.268Z",
    "copyright": {
      "author": "smohan",
      "source": "//smohan.net",
      "belong": "original"
    },
    "allowComment": true,
    "count": {
      "downloads": 0,
      "praises": 14,
      "comments": 11,
      "views": 1182
    },
    "tags": [
      "vue",
      "javascript",
      "分页"
    ],
    "category": {
      "name": "学习笔记",
      "path": "580e36986dd7c320d45984ae",
      "id": "580e36986dd7c320d45984ae"
    }
  },
  {
    "_id": "589f07d73e2b8708305cc7bf",
    "thumbnail": "//img.smohan.net/article/3923ee9db046cbd1d93698ab0aacf651.jpg",
    "excerpt": "各个角度讲解webpack2。如分割webpack配置文件的多种方法，开发环境下的自动刷新，环境变量的设置，打包文件分割，chunk type 块的类型大揭秘等",
    "alias": "bhcly1",
    "title": "看懂前端脚手架你需要这篇webpack",
    "summary": "<p>Webpack 是当下最热门的前端资源模块化管理和打包工具。它可以将许多松散的模块按照依赖和规则打包成符合生产环境部署的前端资源。还可以将按需加载的模块进行代码分隔，等到实际需要的时候再异步加载。通过<code>loader</code> 的转换，任何形式的资源都可以视作模块，比如 <code>CommonJs 模块、 AMD 模块、 ES6 模块、CSS、图片、 JSON、Coffeescript、 LESS</code> 等。<br><a href=\"https://webpack.js.org/\">Webpack 官网</a><br><a href=\"http://webpackdoc.com/\">Webpack 中文指南</a></p>\n",
    "allowReward": true,
    "top": false,
    "updateTime": "2017-08-22T16:08:11.169Z",
    "createTime": "2017-02-11T10:24:36.826Z",
    "copyright": {
      "source": "https://gold.xitu.io/post/586ddb8ab123db005d0b65cb",
      "author": "二口南洋",
      "belong": "reprint"
    },
    "allowComment": true,
    "count": {
      "downloads": 0,
      "praises": 4,
      "comments": 0,
      "views": 392
    },
    "tags": [
      "javascript",
      "webpack",
      "npm",
      "nodejs"
    ],
    "category": {
      "name": "他山之石",
      "path": "580e36a66dd7c320d45984b0",
      "id": "580e36a66dd7c320d45984b0"
    }
  },
  {
    "_id": "587f75da8111c622304cb750",
    "thumbnail": "//img.smohan.net/article/93b1b5505ab2ae192b9544ec6c0f2c51.jpg",
    "excerpt": "在mongoose中使用query.$or和query.$regex实现多条件模糊搜索功能",
    "alias": "qz1etc",
    "title": "Mongoose 多条件模糊查询的实现",
    "summary": "<p>这是今天手头项目中遇到的一个问题,关于<code>mongoose</code>如何实现类似于SQL中 <code>nick LIKE &#39;%keyword%&#39; or email LIKE &#39;%keyword%&#39;</code> 这种多条件模糊搜索的问题。 查阅了<a href=\"http://www.nodeclass.com/api/mongoose.html\">mongoose</a>文档才得以实现,特此记录一下。</p>\n<p>主要用到了<code>query.$or</code>和<code>query.$regex</code>这两个<code>find</code>参数。</p>\n<p>其中<code>query.$or</code>用于实现多条件查询，其值是一个数组。<a href=\"http://www.nodeclass.com/api/mongoose.html#query_Query-or\">相关文档</a></p>\n",
    "allowReward": true,
    "top": false,
    "updateTime": "2017-08-22T16:11:10.420Z",
    "createTime": "2016-05-08T13:47:49.133Z",
    "copyright": {
      "source": "//smohan.net",
      "author": "smohan",
      "belong": "original"
    },
    "allowComment": true,
    "count": {
      "downloads": 0,
      "praises": 1,
      "comments": 3,
      "views": 508
    },
    "tags": [
      "mongodb",
      "mongoose",
      "nodejs",
      "npm",
      "nginx"
    ],
    "category": {
      "name": "且行且冥",
      "path": "580e369f6dd7c320d45984af",
      "id": "580e369f6dd7c320d45984af"
    }
  },
  {
    "_id": "582313ae8da6d62554be0d5f",
    "thumbnail": "//img.smohan.net/article/7c15c2b8ea5af0a0ac5f76f5374b3c94.jpg",
    "excerpt": "javascript学习笔记之正则表达式,了解正则表达式语法,在IDE中使用正则表达式,在javascript 中使用正则表达式处理字符串",
    "alias": "3g3lh0",
    "title": "Javascript学习笔记之正则表达式",
    "summary": "<p>关于正则表达式的总结一直在草稿箱里躺了很久了，与本文原作者<a href=\"https://gold.xitu.io/post/582dfcfda22b9d006b726d11\">水墨寒湘</a>(😂 呵呵，不是我水墨寒)类似，之前对于正则表达式也是一知半解，用到就谷娘的那种。直到哪天看了慕课网的《<a href=\"http://www.imooc.com/learn/706\">JavaScript正则表达式</a>》的视频，豁然开朗啊，正好在掘金上看到这篇文章，顺手手动编辑转载了，用作复习。在此，感谢慕课网以及原作者<a href=\"https://gold.xitu.io/post/582dfcfda22b9d006b726d11\">水墨寒湘</a>的分享。以下为原文：</p>\n<p>正则表达式对于我来说一直像黑暗魔法一样的存在。手机正则去网上搜，邮箱正则去网上搜，复杂点的看看文档拼凑一下，再复杂只能厚着脸皮让其他同事给写一个。从来没有系统的学习过，今天准备拿下它。</p>\n",
    "allowReward": true,
    "top": false,
    "updateTime": "2017-08-22T16:13:17.493Z",
    "createTime": "2016-11-09T12:15:19.582Z",
    "copyright": {
      "author": "水墨寒湘",
      "source": "https://gold.xitu.io/post/582dfcfda22b9d006b726d11",
      "belong": "reprint"
    },
    "allowComment": true,
    "count": {
      "downloads": 0,
      "praises": 2,
      "comments": 0,
      "views": 484
    },
    "tags": [
      "javascript",
      "regexp",
      "正则表达式"
    ],
    "category": {
      "name": "他山之石",
      "path": "580e36a66dd7c320d45984b0",
      "id": "580e36a66dd7c320d45984b0"
    }
  },
  {
    "_id": "581b7aeffab9b93648a982d3",
    "thumbnail": "//img.smohan.net/article/7cebc2acc3c6d1897a4de5a42f2d1ab8.jpg",
    "excerpt": "流光效果主要是利用css3的线性渐变（linear-gradient），2D转换（transform）以及倾斜（skew）配合hover来实现",
    "alias": "eame1m",
    "title": "CSS3实现京东图片鼠标滑过流光效果",
    "summary": "<p>京东首页从1F开始，左侧大图都有一个很有意思的效果，当你的鼠标滑过图片时，会有一层质感很强的流光从左侧不可见位置滑动到右侧不可见位置的效果。相较于淘宝的蒙版效果，个人感觉流光效果更好看一些。因此，本站一些图片也采用了这种流光效果，具体可鼠标滑过博文封面图预览。</p>\n<p>流光效果实现起来很简单，主要是利用css3的线性渐变（<code>linear-gradient</code>），2D转换（<code>transform</code>）以及倾斜（<code>skew</code>）配合hover来实现，当然如果想要兼容一些低版本浏览器，可以使用图片代替。因此，结构相对简单，只需要一个图片父容器（.image-light），图片容器（img），以及流光容器（<code>:before</code>或<code>:after</code>或其他子标签）。</p>\n",
    "allowReward": true,
    "top": false,
    "updateTime": "2017-08-22T16:14:37.213Z",
    "createTime": "2015-08-22T23:18:21.145Z",
    "copyright": {
      "author": "smohan",
      "source": "//smohan.net/",
      "belong": "original"
    },
    "allowComment": true,
    "count": {
      "downloads": 0,
      "praises": 8,
      "comments": 5,
      "views": 3544
    },
    "tags": [
      "css3",
      "linear-gradient",
      "渐变",
      "transform"
    ],
    "category": {
      "name": "前端开发",
      "path": "580e36616dd7c320d45984aa",
      "id": "580e36616dd7c320d45984aa"
    }
  },
  {
    "_id": "581b7620fab9b93648a982d2",
    "thumbnail": "//img.smohan.net/article/7c15c2b8ea5af0a0ac5f76f5374b3c94.jpg",
    "excerpt": "DOM 描绘了一个层次化的节点树。本文从获取节点的名称和类型、获取元素节点的方式、节点指针、节点的操作、DOM操作内容、DOM操作样式、DOM操作位置和大小、常用到的简洁快速的document属性和方法等几个方面总结了JavaScript DOM基础知识",
    "alias": "vhikuj",
    "title": "JavaScript学习笔记之Dom知识点总结",
    "summary": "<p>JavaScript的<code>window</code>对象对应着浏览器窗口本身，因此这个对象的属性和方法统称为BOM（浏览器对象模型），如<code>window.open()</code>,<code>window.location</code>等。</p>\n<p>JavaScript的<code>document</code>对象是指文档对象模型，主要是处理网页内容。DOM（<code>Document Object Model</code>）即文档对象模型，是针对 HTML 和 XML 文档的 API 。字母D指document（文档），字母O指object（对象），字母指Model（模型）。DOM 描绘了一个层次化的节点树。节点表示一个连接点，文档是由节点构成的集合，DOM的节点主要分为三类：<code>元素节点、文本节点（不是文本内容）、属性节点</code>。</p>\n",
    "allowReward": true,
    "top": false,
    "updateTime": "2017-08-22T16:15:17.000Z",
    "createTime": "2015-05-11T23:18:25.145Z",
    "copyright": {
      "author": "smohan",
      "source": "//smohan.net/",
      "belong": "original"
    },
    "allowComment": true,
    "count": {
      "downloads": 0,
      "praises": 3,
      "comments": 0,
      "views": 2927
    },
    "tags": [
      "dom",
      "javascript"
    ],
    "category": {
      "name": "学习笔记",
      "path": "580e36986dd7c320d45984ae",
      "id": "580e36986dd7c320d45984ae"
    }
  },
  {
    "_id": "581b7541fab9b93648a982d1",
    "thumbnail": "//img.smohan.net/article/7c15c2b8ea5af0a0ac5f76f5374b3c94.jpg",
    "excerpt": "数组对象是使用单独的变量名来存储一系列的值；数组可以用一个变量名存储所有的值，并且可以用变量名访问任何一个值；数组中的每个元素都有自己的的ID索引，以便它可以很容易地被访问到；",
    "alias": "fwnuvr",
    "title": "JavaScript学习笔记之数组对象知识点总结",
    "summary": "<p>数组对象是使用单独的变量名来存储一系列的值；数组可以用一个变量名存储所有的值，并且可以用变量名访问任何一个值；数组中的每个元素都有自己的的ID索引，以便它可以很容易地被访问到……</p>\n<p>JavaScript数组元素可以是不同的变量类型。数组元素可以是字符串，可以是对象元素，可以是函数，也可以说是另一个数组……</p>\n<p>JavaScript Array对象属性有<code>constructor</code>（引用数组对象的构造函数），<code>length</code>（返回数组的长度），<code>prototype</code>(增加属性或方法扩展数组定义)。</p>\n",
    "allowReward": true,
    "top": false,
    "updateTime": "2017-08-22T16:15:42.459Z",
    "createTime": "2015-05-07T17:01:13.145Z",
    "copyright": {
      "author": "smohan",
      "source": "//smohan.net/",
      "belong": "original"
    },
    "allowComment": true,
    "count": {
      "downloads": 0,
      "praises": 2,
      "comments": 0,
      "views": 2135
    },
    "tags": [
      "javascript",
      "es6",
      "array"
    ],
    "category": {
      "name": "学习笔记",
      "path": "580e36986dd7c320d45984ae",
      "id": "580e36986dd7c320d45984ae"
    }
  }
]