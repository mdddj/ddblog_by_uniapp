<template>
  <view @tap="nodeTap" :id="attrs.id" :class="'_'+name+' '+attrs.class" :style="(ctrl.root?'border:1px solid black;padding:5px;display:block;':'')+attrs.style">
    <block v-for="(n, i) in childs" v-bind:key="i">
      <!-- 图片 -->
      <!-- 占位图 -->
      <image v-if="n.name==='img'&&((opts[1]&&!ctrl[i])||ctrl[i]<0)" class="_img" :style="n.attrs.style" :src="ctrl[i]<0?opts[2]:opts[1]" mode="widthFix" />
      <!-- 显示图片 -->
      <!-- #ifdef H5 || APP-PLUS -->
      <img v-if="n.name==='img'" :id="n.attrs.id" :class="'_img '+n.attrs.class" :style="(ctrl['e'+i]?'border:1px dashed black;padding:3px;':'')+(ctrl[i]===-1?'display:none;':'')+n.attrs.style" :src="n.attrs.src||(ctrl.load?n.attrs['data-src']:'')" :data-i="i" @load="imgLoad" @error="mediaError" @tap.stop="imgTap" @longpress="imgLongTap"/>
      <!-- #endif -->
      <!-- #ifndef H5 || APP-PLUS -->
      <image v-if="n.name==='img'" :id="n.attrs.id||('n'+i)" :class="'_img '+n.attrs.class" :style="(ctrl['e'+i]?'border:1px dashed black;padding:3px;':'')+(ctrl[i]===-1?'display:none;':'')+'width:'+(ctrl[i]||1)+'px;height:'+(ctrl['h'+i]||1)+'px;'+n.attrs.style" :src="n.attrs.src" :mode="n.h?'':'widthFix'" :lazy-load="opts[0]" :webp="n.webp" :show-menu-by-longpress="!opts[4]&&opts[3]&&!n.attrs.ignore" :image-menu-prevent="opts[4]||!opts[3]||n.attrs.ignore" :data-i="i" @load="imgLoad" @error="mediaError" @tap.stop="imgTap" @longpress="imgLongTap" />
      <!-- #endif -->
      <!-- 文本 -->
      <text v-else-if="n.type==='text'&&!ctrl['e'+i]" :data-i="i" @tap="editStart">{{n.text}}
        <text v-if="!n.text" style="color:gray">{{opts[5]||'请输入'}}</text>
      </text>
      <text v-else-if="n.type==='text'&&ctrl['e'+i]===1" :data-i="i" style="border:1px dashed black;min-width:50px;width:auto;padding:5px;display:block" @tap.stop="editStart">{{n.text}}
        <text v-if="!n.text" style="color:gray">{{opts[5]||'请输入'}}</text>
      </text>
      <textarea v-else-if="n.type==='text'" style="border:1px dashed black;min-width:50px;width:auto;padding:5px" auto-height maxlength="-1" :focus="ctrl['e'+i]===3" :value="n.text" :data-i="i" @input="editInput" @blur="editEnd" />
      <text v-else-if="n.name==='br'">\n</text>
      <!-- 链接 -->
      <view v-else-if="n.name==='a'" :id="n.attrs.id" :class="(n.attrs.href?'_a ':'')+n.attrs.class" hover-class="_hover" :style="'display:inline;'+n.attrs.style" :data-i="i" @tap.stop="linkTap">
        <node name="span" :childs="n.children" :opts="[opts[0],opts[1],opts[2],opts[3],opts[4],opts[5],opts[6]+'.'+i+'.children']" style="display:inherit" />
      </view>
      <!-- 视频 -->
      <!-- #ifdef APP-PLUS -->
      <view v-else-if="n.html" :data-i="i" @tap="mediaTap" :id="n.attrs.id" :class="'_video '+n.attrs.class" :style="n.attrs.style" v-html="n.html" />
      <!-- #endif -->
      <!-- #ifndef APP-PLUS -->
      <video :show-center-play-btn="!opts[4]" @tap="mediaTap" v-else-if="n.name==='video'" :id="n.attrs.id" :class="n.attrs.class" :style="n.attrs.style" :autoplay="n.attrs.autoplay" :controls="n.attrs.controls" :loop="n.attrs.loop" :muted="n.attrs.muted" :poster="n.attrs.poster" :src="n.src[ctrl[i]||0]" :data-i="i" @play="play" @error="mediaError" />
      <!-- #endif -->
      <!-- #ifdef H5 || APP-PLUS -->
      <iframe v-else-if="n.name==='iframe'" :style="n.attrs.style" :allowfullscreen="n.attrs.allowfullscreen" :frameborder="n.attrs.frameborder" :src="n.attrs.src" />
      <embed v-else-if="n.name==='embed'" :style="n.attrs.style" :src="n.attrs.src" />
      <!-- #endif -->
      <!-- #ifndef MP-TOUTIAO -->
      <!-- 音频 -->
      
      <!-- #endif -->
      <view v-else-if="(n.name==='table'&&(n.c||opts[4]))||n.name==='li'" :id="n.attrs.id" :class="'_'+n.name+' '+n.attrs.class" :style="n.attrs.style">
        <node v-if="n.name==='li'" :childs="n.children" :opts="[opts[0],opts[1],opts[2],opts[3],opts[4],opts[5],opts[6]+'.'+i+'.children']" />
        <view v-else v-for="(tbody, x) in n.children" v-bind:key="x" :class="'_'+tbody.name+' '+tbody.attrs.class" :style="tbody.attrs.style">
          <node v-if="tbody.name==='td'||tbody.name==='th'" :childs="tbody.children" :opts="[opts[0],opts[1],opts[2],opts[3],opts[4],opts[5],opts[6]+'.'+i+'.children.'+x+'.children']" />
          <block v-else v-for="(tr, y) in tbody.children" v-bind:key="y">
            <view v-if="tr.name==='td'||tr.name==='th'" :class="'_'+tr.name+' '+tr.attrs.class" :style="tr.attrs.style">
              <node :childs="tr.children" :opts="[opts[0],opts[1],opts[2],opts[3],opts[4],opts[5],opts[6]+'.'+i+'.children.'+x+'.children.'+y+'.children']" />
            </view>
            <view v-else :class="'_'+tr.name+' '+tr.attrs.class" :style="tr.attrs.style">
              <view v-for="(td, z) in tr.children" v-bind:key="z" :class="'_'+td.name+' '+td.attrs.class" :style="td.attrs.style">
                <node :childs="td.children" :opts="[opts[0],opts[1],opts[2],opts[3],opts[4],opts[5],opts[6]+'.'+i+'.children.'+x+'.children.'+y+'.children.'+z+'.children']" />
              </view>
            </view>
          </block>
        </view>
      </view>
      <my-audio @tap="mediaTap" v-else-if="n.name=='audio'" :class="n.attrs.class" :style="n.attrs.style" :aid="n.attrs.id" :author="n.attrs.author" :controls="n.attrs.controls" :autoplay="n.attrs.autoplay" :loop="n.attrs.loop" :name="n.attrs.name" :poster="n.attrs.poster" :src="n.src[ctrl[i]||0]" :data-i="i" data-source="audio" @play="play" @error="mediaError" />
      <!-- 富文本 -->
      <!-- #ifdef H5 || MP-WEIXIN || MP-QQ || APP-PLUS || MP-360 -->
      <rich-text v-else-if="!opts[4]&&handler.use(n)" :id="n.attrs.id" :style="n.f" :nodes="[n]" />
      <!-- #endif -->
      <!-- #ifndef H5 || MP-WEIXIN || MP-QQ || APP-PLUS || MP-360 -->
      <rich-text v-else-if="!opts[4]&&!n.c" :id="n.attrs.id" :style="n.f+';display:inline'" :preview="false" :nodes="[n]" />
      <!-- #endif -->
      <!-- 继续递归 -->
      <view v-else-if="n.c===2" :id="n.attrs.id" :class="'_'+n.name+' '+n.attrs.class" :style="n.f+';'+n.attrs.style">
        <node v-for="(n2, j) in n.children" v-bind:key="j" :style="n2.f" :name="n2.name" :attrs="n2.attrs" :childs="n2.children" :opts="[opts[0],opts[1],opts[2],opts[3],opts[4],opts[5],opts[6]+'.'+i+'.children.'+j+'.children']" />
      </view>
      <node v-else :style="n.f" :name="n.name" :attrs="n.attrs" :childs="n.children" :opts="[opts[0],opts[1],opts[2],opts[3],opts[4],opts[5],opts[6]+'.'+i+'.children']" />
    </block>
  </view>
</template>
<script module="handler" lang="wxs">
// 行内标签列表
var inlineTags = {
  abbr: true,
  b: true,
  big: true,
  code: true,
  del: true,
  em: true,
  i: true,
  ins: true,
  label: true,
  q: true,
  small: true,
  span: true,
  strong: true,
  sub: true,
  sup: true
}
/**
 * @description 是否使用 rich-text 显示剩余内容
 */
module.exports = {
  use: function (item) {
    if (item.c) return false
    // 微信和 QQ 的 rich-text inline 布局无效
    return !inlineTags[item.name] && (item.attrs.style || '').indexOf('display:inline') == -1
  }
}
</script>
<script>
function getTop(e) {
  let top
  // #ifdef H5 || APP-PLUS
  top = e.touches[0].pageY
  // #endif
  // #ifdef MP-ALIPAY
  top = e.detail.pageY
  // #endif
  // #ifndef H5 || MP-ALIPAY || APP-PLUS
  top = e.detail.y
  // #endif
  if (top - e.currentTarget.offsetTop < 150)
    top = e.currentTarget.offsetTop
  if (top < 30)
    top += 70
  return top - 30
}
import myAudio from '../audio/audio'

import node from './node'
export default {
  name: 'node',
  options: {
    // #ifdef MP-WEIXIN
    virtualHost: true,
    // #endif
    // #ifdef MP-TOUTIAO
    addGlobalClass: false
    // #endif
  },
  data () {
    return {
      ctrl: {}
    }
  },
  props: {
    name: String,
    attrs: {
      type: Object,
      default () {
        return {}
      }
    },
    childs: Array,
    opts: Array
  },
  components: {
myAudio,

    node
  },
  mounted () {
    for (this.root = this.$parent; this.root.$options.name !== 'mp-html'; this.root = this.root.$parent);
    // #ifdef H5 || APP-PLUS
    if (this.opts[0]) {
      let i
      for (i = this.childs.length; i--;) {
        if (this.childs[i].name === 'img') break
      }
      if (i !== -1) {
        this.observer = uni.createIntersectionObserver(this).relativeToViewport({
          top: 500,
          bottom: 500
        })
        this.observer.observe('._img', res => {
          if (res.intersectionRatio) {
            this.$set(this.ctrl, 'load', 1)
            this.observer.disconnect()
          }
        })
      }
    }
    // #endif
  },
  beforeDestroy () {
  if (this.root._edit === this) {
    this.root._edit = undefined
  }
    // #ifdef H5 || APP-PLUS
    if (this.observer) {
      this.observer.disconnect()
    }
    // #endif
  },
  methods:{editStart (e) {
      if (this.opts[4]) {
        const i = e.currentTarget.dataset.i
        if (!this.ctrl['e' + i]) {
          // 显示虚线框
          this.$set(this.ctrl, 'e' + i, 1)
          setTimeout(() => {
            this.root._mask.push(() => this.$set(this.ctrl, 'e' + i, 0))
          }, 50)
          this.root._edit = this
          this.i = i
          this.cursor = this.childs[i].text.length
        } else {
          this.root._mask.pop()
          this.root._maskTap()
          // 将 text 转为 textarea
          this.$set(this.ctrl, 'e' + i, 2)
          // 延时对焦，避免高度错误
          setTimeout(() => {
            this.$set(this.ctrl, 'e' + i, 3)
          }, 50)
        }
      }
    },editInput (e) {
      const i = e.target.dataset.i
      // 替换连续空格
      const value = e.detail.value.replace(/ {2,}/, $ => {
        let res = '\xa0'
        for (let i = 1; i < $.length; i++) {
          res += '\xa0'
        }
        return res
      })
      this.root._editVal(`${this.opts[6]}.${i}.text`, this.childs[i].text, value) // 记录编辑历史
      this.cursor = e.detail.cursor
    },editEnd (e) {
      const i = e.target.dataset.i
      this.$set(this.ctrl, 'e' + i, 0)
      // 更新到视图
      this.root._setData(`${this.opts[6]}.${i}.text`, e.detail.value)
    },insert (node) {
      setTimeout(() => {
        const childs = this.childs.slice(0)
        if (!childs[this.i]) {
          childs.push(node)
        } else if (childs[this.i].text) {
          // 在文本中插入
          const text = childs[this.i].text
          const list = []
          if (this.cursor) {
            list.push({
              type: 'text',
              text: text.substring(0, this.cursor)
            })
          }
          list.push(node)
          if (this.cursor < text.length) {
            list.push({
              type: 'text',
              text: text.substring(this.cursor)
            })
          }
          childs.splice(this.i, 1, ...list)
        } else {
          childs.splice(parseInt(this.i) + 1, 0, node)
        }
        this.root._editVal(this.opts[6], this.childs, childs, true)
      }, 200)
    },remove (i) {
      const arr = this.childs.slice(0)
      arr.splice(i, 1)
      this.root._edit = undefined
      this.root._maskTap()
      this.root._editVal(this.opts[6], this.childs, arr, true)
    },nodeTap (e) {
      if (this.opts[4]) {
        if (this.root._lock) return
        this.root._lock = true
        setTimeout(() => {
          this.root._lock = false
        }, 50)
        if (this.ctrl['e' + this.i] === 3) return
        this.root._maskTap()
        this.root._edit = this
        let start = this.opts[6].lastIndexOf('children.')
        if (start !== -1) {
          start += 9
        } else {
          start = 6
        }
        const i = parseInt(this.opts[6].substring(start, this.opts[6].lastIndexOf('.children')))
        let parent = this.$parent
        while (parent && parent.$options.name !== 'node') {
          parent = parent.$parent
        }
        if (!parent || this.opts[6].length - parent.opts[6].length > 15) return
        // 显示实线框
        this.$set(this.ctrl, 'root', 1)
        this.root._mask.push(() => this.$set(this.ctrl, 'root', 0))
        if (this.childs.length === 1 && this.childs[0].type === 'text' && !this.ctrl.e0) {
          this.$set(this.ctrl, 'e0', 1)
          this.root._mask.push(() => this.$set(this.ctrl, 'e0', 0))
          this.i = 0
          this.cursor = this.childs[0].text.length
        }
        const items = this.root._getItem(parent.childs[i])
        this.root._tooltip({
          top: getTop(e),
          items,
          success: tapIndex => {
            if (items[tapIndex] === '大小') {
              // 改变字体大小
              const style = parent.childs[i].attrs.style || ''
              let value = style.match(/;font-size:([0-9]+)px/)
              if (value) {
                value = parseInt(value[1])
              } else {
                value = 16
              }
              this.root._slider({
                min: 10,
                max: 30,
                value,
                top: getTop(e),
                changing: val => {
                  if (Math.abs(val - value) > 2) {
                    // 字号变换超过 2 时更新到视图
                    parent.changeStyle('font-size', i, val + 'px', value + 'px')
                    value = e.detail.value
                  }
                },
                change: val => {
                  if (val !== value) {
                    parent.changeStyle('font-size', i, val + 'px', value + 'px')
                  }
                  this.root._editVal(`${parent.opts[6]}.${i}.attrs.style`, style, parent.childs[i].attrs.style)
                }
              })
            } else if (items[tapIndex] === '删除') {
              parent.remove(i)
            } else {
              const style = parent.childs[i].attrs.style || ''
              let newStyle = ''
              const item = items[tapIndex]
              let name
              let value
              if (item === '斜体') {
                name = 'font-style'
                value = 'italic'
              } else if (item === '粗体') {
                name = 'font-weight'
                value = 'bold'
              } else if (item === '下划线') {
                name = 'text-decoration'
                value = 'underline'
              } else if (item === '居中') {
                name = 'text-align'
                value = 'center'
              } else if (item === '缩进') {
                name = 'text-indent'
                value = '2em'
              }
              if (style.includes(name + ':')) {
                // 已有则取消
                newStyle = style.replace(new RegExp(name + ':[^;]+'), '')
              } else {
                // 没有则添加
                newStyle = style + ';' + name + ':' + value
              }
              this.root._editVal(`${parent.opts[6]}.${i}.attrs.style`, style, newStyle, true)
            }
          }
        })
      }
    },mediaTap (e) {
      if (this.opts[4]) {
        const i = e.target.dataset.i
        const node = this.childs[i]
        const items = this.root._getItem(node)
        this.root._edit = this
        this.i = i
        this.root._tooltip({
          top: e.target.offsetTop - 30,
          items,
          success: tapIndex => {
            if (items[tapIndex] === '封面') {
              // 设置封面
              this.root.getSrc('img', node.attrs.poster).then(url => {
                this.root._editVal(`${this.opts[6]}.${i}.attrs.poster`, node.attrs.poster, url, true)
              }).catch(() => { })
            } else if (items[tapIndex] === '删除') {
              this.remove(i)
            } else {
              // 切换循环播放
              this.root._setData(`${this.opts[6]}.${i}.attrs.loop`, !node.attrs.loop)
              uni.showToast({
                title: '成功'
              })
            }
          }
        })
        // 避免上层出现点击态
        this.root._lock = true
        setTimeout(() => {
          this.root._lock = false
        }, 50)
      }
    },changeStyle (name, i, value, oldVal) {
      let style = this.childs[i].attrs.style || ''
      if (style.includes(';' + name + ':' + oldVal)) {
        // style 中已经有
        style = style.replace(';' + name + ':' + oldVal, ';' + name + ':' + value)
      } else {
        // 没有则新增
        style += ';' + name + ':' + value
      }
      this.root._setData(`${this.opts[6]}.${i}.attrs.style`, style)
    },
    // #ifdef MP-WEIXIN
    toJSON () { },
    // #endif
    /**
     * @description 播放视频事件
     * @param {Event} e
     */
    play (e) {
      // #ifndef APP-PLUS
      if (this.root.pauseVideo) {
        let flag = false; const id = e.target.id
        for (let i = this.root._videos.length; i--;) {
          if (this.root._videos[i].id === id) {
            flag = true
          } else {
            this.root._videos[i].pause() // 自动暂停其他视频
          }
        }
        // 将自己加入列表
        if (!flag) {
          const ctx = uni.createVideoContext(id
            // #ifndef MP-BAIDU
            , this
            // #endif
          )
          ctx.id = id
          this.root._videos.push(ctx)
        }
      }
      // #endif
    },

    /**
     * @description 图片点击事件
     * @param {Event} e
     */
    imgTap (e) {
      if (!this.opts[4]) {
      const node = this.childs[e.currentTarget.dataset.i]
      if (node.a) {
        this.linkTap(node.a)
        return
      }
      if (node.attrs.ignore) return
      // #ifdef H5 || APP-PLUS
      node.attrs.src = node.attrs.src || node.attrs['data-src']
      // #endif
      this.root.$emit('imgtap', node.attrs)
      // 自动预览图片
      if (this.root.previewImg) {
        uni.previewImage({
          current: parseInt(node.attrs.i),
          urls: this.root.imgList
        })
      }
    } else {
        const i = e.currentTarget.dataset.i
        const node = this.childs[i]
        const items = this.root._getItem(node)
        this.root._edit = this
        this.i = i
        this.root._maskTap()
        this.$set(this.ctrl, 'e' + i, 1)
        this.root._mask.push(() => this.$set(this.ctrl, 'e' + i, 0))
        this.root._tooltip({
          top: getTop(e),
          items,
          success: tapIndex => {
            if (items[tapIndex] === '换图') {
              // 换图
              this.root.getSrc('img', node.attrs.src).then(src => {
                this.root._editVal(this.opts[6] + '.' + i + '.attrs.src', node.attrs.src, src, true)
              }).catch(() => { })
            } else if (items[tapIndex] === '宽度') {
              // 更改宽度
              const style = node.attrs.style || ''
              let value = style.match(/max-width:([0-9]+)%/)
              if (value) {
                value = parseInt(value[1])
              } else {
                value = 100
              }
              this.root._slider({
                min: 0,
                max: 100,
                value,
                top: getTop(e),
                changing: val => {
                  // 变化超过 5% 更新时视图
                  if (Math.abs(val - value) > 5) {
                    this.changeStyle('max-width', i, val + '%', value + '%')
                    value = val
                  }
                },
                change: val => {
                  if (val !== value) {
                    this.changeStyle('max-width', i, val + '%', value + '%')
                    value = val
                  }
                  this.root._editVal(this.opts[6] + '.' + i + '.attrs.style', style, this.childs[i].attrs.style)
                }
              })
            } else if (items[tapIndex] === '超链接') {
              // 将图片设置为链接
              this.root.getSrc('link').then(url => {
                this.root._editVal(this.opts[6] + '.' + i, node, {
                  name: 'a',
                  attrs: {
                    href: url
                  },
                  children: [node]
                }, true)
                wx.showToast({
                  title: '成功'
                })
              }).catch(() => { })
            } else if (items[tapIndex] === '预览图') {
              // 设置预览图链接
              this.root.getSrc('img', node.attrs['original-src']).then(url => {
                this.root._editVal(this.opts[6] + '.' + i + '.attrs.original-src', node.attrs['original-src'], url, true)
                uni.showToast({
                  title: '成功'
                })
              }).catch(() => { })
            } else if (items[tapIndex] === '删除') {
              this.remove(i)
            } else {
              // 禁用 / 启用预览
              this.root._setData(this.opts[6] + '.' + i + '.attrs.ignore', !node.attrs.ignore)
              uni.showToast({
                title: '成功'
              })
            }
          }
        })
        this.root._lock = true
        setTimeout(() => {
          this.root._lock = false
        }, 50)
      }
    },
    /**
     * @description 图片长按
     */
    imgLongTap (e) {
      // #ifdef APP-PLUS
      const attrs = this.childs[e.currentTarget.dataset.i].attrs
      if (!attrs.ignore) {
        uni.showActionSheet({
          itemList: ['保存图片'],
          success: () => {
            const save = path => {
              uni.saveImageToPhotosAlbum({
                filePath: path,
                success () {
                  uni.showToast({
                    title: '保存成功'
                  })
                }
              })
            }
            if (this.root.imgList[attrs.i].startsWith('http')) {
              uni.downloadFile({
                url: this.root.imgList[attrs.i],
                success: res => save(res.tempFilePath)
              })
            } else {
              save(this.root.imgList[attrs.i])
            }
          }
        })
      }
      // #endif
    },

    /**
     * @description 图片加载完成事件
     * @param {Event} e
     */
    imgLoad(e) {
      // #ifdef MP-WEIXIN || MP-QQ
      if (this.opts[4])
        this.$nextTick(() => {
          const id = this.childs[i].attrs.id || ('n' + i)
          uni.createSelectorQuery().in(this).select('#' + id).boundingClientRect().exec(res => {
            this.$set(this.ctrl, 'h'+i, res[0].height)
          })
        })
      // #endif
      const i = e.currentTarget.dataset.i
      /* #ifndef H5 || APP-PLUS */
      if (!this.childs[i].w) {
        this.$set(this.ctrl, i, e.detail.width)
        if (this.opts[4]) {
          const path = this.opts[6] + '.' + i + '.attrs.'
          if (e.detail.width < 150)
            this.root._setData(path + 'ignore', 'T')
          this.root._setData(path + 'width', e.detail.width.toString())
        }
      } else /* #endif */ if ((this.opts[1] && !this.ctrl[i]) || this.ctrl[i] === -1) {
        // 加载完毕，取消加载中占位图
        this.$set(this.ctrl, i, 1)
      }
    },

    /**
     * @description 链接点击事件
     * @param {Event} e
     */
    linkTap (e) {
      if (!this.opts[4]) {
      const node = e.currentTarget ? this.childs[e.currentTarget.dataset.i] : {}
      const attrs = node.attrs || e
      const href = attrs.href
      this.root.$emit('linktap', Object.assign({
        innerText: this.root.getText(node.children || []) // 链接内的文本内容
      }, attrs))
      if (href) {
        if (href[0] === '#') {
          // 跳转锚点
          this.root.navigateTo(href.substring(1)).catch(() => { })
        } else if (href.includes('://')) {
          // 复制外部链接
          if (this.root.copyLink) {
            // #ifdef H5
            window.open(href)
            // #endif
            // #ifdef MP
            uni.setClipboardData({
              data: href,
              success: () =>
                uni.showToast({
                  title: '链接已复制'
                })
            })
            // #endif
            // #ifdef APP-PLUS
            plus.runtime.openWeb(href)
            // #endif
          }
        } else {
          // 跳转页面
          uni.navigateTo({
            url: href,
            fail () {
              uni.switchTab({
                url: href,
                fail () { }
              })
            }
          })
        }
      }
    } else {
        const i = e.currentTarget.dataset.i
        const node = this.childs[i]
        const items = this.root._getItem(node)
        this.root._tooltip({
          top: getTop(e),
          items,
          success: tapIndex => {
            if (items[tapIndex] === '更换链接') {
              this.root.getSrc('link', node.attrs.href).then(url => {
                this.root._editVal(this.opts[6] + '.' + i + '.attrs.href', node.attrs.href, url, true)
                uni.showToast({
                  title: '成功'
                })
              }).catch(() => { })
            } else {
              this.remove(i)
            }
          }
        })
      }
    },
    /**
     * @description 错误事件
     * @param {Event} e
     */
    mediaError (e) {
      const i = e.currentTarget.dataset.i
      const node = this.childs[i]
      // 加载其他源
      if (node.name === 'video' || node.name === 'audio') {
        let index = (this.ctrl[i] || 0) + 1
        if (index > node.src.length) {
          index = 0
        }
        if (index < node.src.length) {
          this.$set(this.ctrl, i, index)
          return
        }
      } else if (node.name === 'img' && this.opts[2]) {
        // 显示错误占位图
        this.$set(this.ctrl, i, -1)
      }
      if (this.root) {
        this.root.$emit('error', {
          source: node.name,
          attrs: node.attrs,
          errMsg: e.detail.errMsg
        })
      }
    }
  }
}
</script>
<style>/deep/ .hl-code,/deep/ .hl-pre{color:#ccc;background:0 0;font-family:Consolas,Monaco,'Andale Mono','Ubuntu Mono',monospace;font-size:1em;text-align:left;white-space:pre;word-spacing:normal;word-break:normal;word-wrap:normal;line-height:1.5;-moz-tab-size:4;-o-tab-size:4;tab-size:4;-webkit-hyphens:none;-moz-hyphens:none;-ms-hyphens:none;hyphens:none}/deep/ .hl-pre{padding:1em;margin:.5em 0;overflow:auto}/deep/ .hl-pre{background:#2d2d2d}/deep/ .hl-block-comment,/deep/ .hl-cdata,/deep/ .hl-comment,/deep/ .hl-doctype,/deep/ .hl-prolog{color:#999}/deep/ .hl-punctuation{color:#ccc}/deep/ .hl-attr-name,/deep/ .hl-deleted,/deep/ .hl-namespace,/deep/ .hl-tag{color:#e2777a}/deep/ .hl-function-name{color:#6196cc}/deep/ .hl-boolean,/deep/ .hl-function,/deep/ .hl-number{color:#f08d49}/deep/ .hl-class-name,/deep/ .hl-constant,/deep/ .hl-property,/deep/ .hl-symbol{color:#f8c555}/deep/ .hl-atrule,/deep/ .hl-builtin,/deep/ .hl-important,/deep/ .hl-keyword,/deep/ .hl-selector{color:#cc99cd}/deep/ .hl-attr-value,/deep/ .hl-char,/deep/ .hl-regex,/deep/ .hl-string,/deep/ .hl-variable{color:#7ec699}/deep/ .hl-entity,/deep/ .hl-operator,/deep/ .hl-url{color:#67cdcc}/deep/ .hl-bold,/deep/ .hl-important{font-weight:700}/deep/ .hl-italic{font-style:italic}/deep/ .hl-entity{cursor:help}/deep/ .hl-inserted{color:green}/deep/ .md-p {
  margin-block-start: 1em;
  margin-block-end: 1em;
}

/deep/ .md-table,
/deep/ .md-blockquote {
  margin-bottom: 16px;
}

/deep/ .md-table {
  box-sizing: border-box;
  width: 100%;
  overflow: auto;
  border-spacing: 0;
  border-collapse: collapse;
}

/deep/ .md-tr {
  background-color: #fff;
  border-top: 1px solid #c6cbd1;
}

/deep/ .md-table .md-tr:nth-child(2n) {
  background-color: #f6f8fa;
}

/deep/ .md-th,
/deep/ .md-td {
  padding: 6px 13px !important;
  border: 1px solid #dfe2e5;
}

/deep/ .md-th {
  font-weight: 600;
}

/deep/ .md-blockquote {
  padding: 0 1em;
  color: #6a737d;
  border-left: 0.25em solid #dfe2e5;
}

/deep/ .md-code {
  padding: 0.2em 0.4em;
  font-family: SFMono-Regular, Consolas, Liberation Mono, Menlo, monospace;
  font-size: 85%;
  background-color: rgba(27, 31, 35, 0.05);
  border-radius: 3px;
}

/deep/ .md-pre .md-code {
  padding: 0;
  font-size: 100%;
  background: transparent;
  border: 0;
}/* #ifndef H5 || MP-ALIPAY || APP-PLUS */
  ._address,
  ._article,
  ._aside,
  ._body,
  ._caption,
  ._center,
  ._cite,
  ._footer,
  ._header,
  ._html,
  ._nav,
  ._pre,
  ._section {
    display: block;
  }
  
  /* #endif */
  ._video {
    width: 300px;
    height: 225px;
    display: inline-block;
    background-color: black;
  }
/* a 标签默认效果 */
._a {
  padding: 1.5px 0 1.5px 0;
  color: #366092;
  word-break: break-all;
}

/* a 标签点击态效果 */
._hover {
  text-decoration: underline;
  opacity: 0.7;
}

/* 图片默认效果 */
._img {
  max-width: 100%;
  -webkit-touch-callout: none;
}

/* 内部样式 */

._b,
._strong {
  font-weight: bold;
}

._code {
  font-family: monospace;
}

._del {
  text-decoration: line-through;
}

._em,
._i {
  font-style: italic;
}

._h1 {
  font-size: 2em;
}

._h2 {
  font-size: 1.5em;
}

._h3 {
  font-size: 1.17em;
}

._h5 {
  font-size: 0.83em;
}

._h6 {
  font-size: 0.67em;
}

._h1,
._h2,
._h3,
._h4,
._h5,
._h6 {
  display: block;
  font-weight: bold;
}

._image {
  height: 1px;
}

._ins {
  text-decoration: underline;
}

._li {
  display: list-item;
}

._ol {
  list-style-type: decimal;
}

._ol,
._ul {
  display: block;
  padding-left: 40px;
  margin: 1em 0;
}

._q::before {
  content: '"';
}

._q::after {
  content: '"';
}

._sub {
  font-size: smaller;
  vertical-align: sub;
}

._sup {
  font-size: smaller;
  vertical-align: super;
}

._thead,
._tbody,
._tfoot {
  display: table-row-group;
}

._tr {
  display: table-row;
}

._td,
._th {
  display: table-cell;
  vertical-align: middle;
}

._th {
  font-weight: bold;
  text-align: center;
}

._ul {
  list-style-type: disc;
}

._ul ._ul {
  margin: 0;
  list-style-type: circle;
}

._ul ._ul ._ul {
  list-style-type: square;
}

._abbr,
._b,
._code,
._del,
._em,
._i,
._ins,
._label,
._q,
._span,
._strong,
._sub,
._sup {
  display: inline;
}

/* #ifdef APP-PLUS */
._video {
  width: 300px;
  height: 225px;
}
/* #endif */
</style>