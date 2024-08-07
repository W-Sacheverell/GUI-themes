const PATH = 'data/third/custom-theme'
const THEME_FILE = PATH + '/themes.json'

const VariableList = [
  // 主色
  '--primary-color',
  // 次色
  '--secondary-color',
  // 文字颜色
  '--color-light',
  '--color-dark',
  // 背景颜色
  '--bg-color-light',
  '--bg-color-dark',
  // 滚动条颜色
  '--scrollbar-track-bg-light',
  '--scrollbar-thumb-bg-light',
  '--scrollbar-track-bg-dark',
  '--scrollbar-thumb-bg-dark',
  // 普通按钮颜色
  '--btn-normal-color-light',
  '--btn-normal-bg-light',
  '--btn-normal-hover-color-light',
  '--btn-normal-hover-border-color-light',
  '--btn-normal-active-color-light',
  '--btn-normal-active-border-color-light',
  '--btn-normal-color-dark',
  '--btn-normal-bg-dark',
  '--btn-normal-hover-color-dark',
  '--btn-normal-hover-border-color-dark',
  '--btn-normal-active-color-dark',
  '--btn-normal-active-border-color-dark',
  // 主要按钮颜色
  '--btn-primary-color-light',
  '--btn-primary-bg-light',
  '--btn-primary-hover-bg-light',
  '--btn-primary-active-bg-light',
  '--btn-primary-color-dark',
  '--btn-primary-bg-dark',
  '--btn-primary-hover-bg-dark',
  '--btn-primary-active-bg-dark',
  // 链接按钮颜色
  '--btn-link-color-light',
  '--btn-link-bg-light',
  '--btn-link-hover-color-light',
  '--btn-link-active-color-light',
  '--btn-link-color-dark',
  '--btn-link-bg-dark',
  '--btn-link-hover-color-dark',
  '--btn-link-active-color-dark',
  // 文本按钮颜色
  '--btn-text-color-light',
  '--btn-text-bg-light',
  '--btn-text-hover-bg-light',
  '--btn-text-active-bg-light',
  '--btn-text-color-dark',
  '--btn-text-bg-dark',
  '--btn-text-hoer-color-dark',
  '--btn-text-hover-bg-dark',
  '--btn-text-active-color-dark',
  '--btn-text-active-bg-dark',
  // 单选
  '--radio-normal-color-light',
  '--radio-normal-bg-light',
  '--radio-normal-hover-color-light',
  '--radio-primary-color-light',
  '--radio-primary-bg-light',
  '--radio-primary-hover-bg-light',
  '--radio-primary-active-bg-light',
  '--radio-normal-color-dark',
  '--radio-normal-bg-dark',
  '--radio-normal-hover-color-dark',
  '--radio-primary-color-dark',
  '--radio-primary-bg-dark',
  '--radio-primary-hover-bg-dark',
  '--radio-primary-active-bg-dark',
  // 卡片
  '--card-color-light',
  '--card-bg-light',
  '--card-hover-bg-light',
  '--card-active-bg-light',
  '--card-color-dark',
  '--card-bg-dark',
  '--card-hover-bg-dark',
  '--card-active-bg-dark',
  // 进度条
  '--progress-bg-light',
  '--progress-inner-bg-light',
  '--progress-bg-dark',
  '--progress-inner-bg-dark',
  // 下拉
  '--dropdown-bg-light',
  '--dropdown-bg-dark',
  // 模态框
  '--modal-bg-light',
  '--modal-mask-bg-light',
  '--modal-bg-dark',
  '--modal-mask-bg-dark',
  // 开关
  '--switch-on-bg-light',
  '--switch-on-dot-bg-light',
  '--switch-on-bg-dark',
  '--switch-on-dot-bg-dark',
  '--switch-off-bg-light',
  '--switch-off-dot-bg-light',
  '--switch-off-bg-dark',
  '--switch-off-dot-bg-dark',
  // 输入框
  '--input-color-light',
  '--input-bg-light',
  '--input-color-dark',
  '--input-bg-dark',
  // 分割线
  '--divider-color-light',
  '--divider-color-dark',
  // 选择框
  '--select-color-light',
  '--select-bg-light',
  '--select-option-bg-light',
  '--select-color-dark',
  '--select-bg-dark',
  '--select-option-bg-dark',
  // 提示
  '--toast-bg-light',
  '--toast-bg-dark',
  // 菜单
  '--menu-bg-light',
  '--menu-item-hover-light',
  '--menu-bg-dark',
  '--menu-item-hover-dark',
  // 表格
  '--table-tr-odd-bg-light',
  '--table-tr-even-bg-light',
  '--table-tr-odd-hover-bg-light',
  '--table-tr-even-hover-bg-light',
  '--table-tr-odd-bg-dark',
  '--table-tr-even-bg-dark',
  '--table-tr-odd-hover-bg-dark',
  '--table-tr-even-hover-bg-dark',
  // 延迟颜色
  '--level-0-color',
  '--level-1-color',
  '--level-2-color',
  '--level-3-color',
  '--level-4-color'
]

const BackgroundList = [
  ['#434343', 'linear-gradient(to right, #434343 0%, black 100%)'],
]

const onInstall = async () => {
  await Reset(false)
  await onReady()
  Plugins.message.success('安装完成')
}

const onUninstall = async () => {
  await Plugins.confirm('提示', '卸载后，主题文件将被删除！')
  await Plugins.Removefile(PATH)
  Clear()
}

const onReady = async () => {
  const config = JSON.parse(await Plugins.Readfile(THEME_FILE))
  await setVariable(config)
  await setBackground(config)
}

const onRun = async () => {
  const config = JSON.parse(await Plugins.Readfile(THEME_FILE))
  await setVariable(config)
  await setBackground(config)
  Plugins.message.success('主题已生效')
}

/**
 * 插件钩子 - 右键：下个背景
 */
const Next = async () => {
  const config = JSON.parse(await Plugins.Readfile(THEME_FILE))

  if (config.backgroundIndex++ >= BackgroundList.length - 1) {
    config.backgroundIndex = 0
  }

  await Plugins.Writefile(THEME_FILE, JSON.stringify(config, null, 2))

  await setBackground(config)
}

/**
 * 插件钩子 - 右键：清除主题
 */
const Clear = () => {
  VariableList.forEach((property) => {
    document.body.style.removeProperty(property)
  })
  document.body.style.backgroundColor = ''
  document.body.style.backgroundImage = ''
}

/**
 * 插件钩子 - 右键：重置配置
 */
const Reset = async (isReset = true) => {
  isReset && (await Plugins.confirm('提示', '主题文件将被替换为默认！'))

  const config = { variable: {}, backgroundIndex: 9 }

  const theme = getComputedStyle(document.documentElement)
  VariableList.forEach((property) => {
    config.variable[property] = theme.getPropertyValue(property)
  })

  await Plugins.Writefile(THEME_FILE, JSON.stringify(config, null, 2))

  isReset && Plugins.message.success('重置成功')

  isReset && onReady()
}

/**
 * 设置自定义CSS颜色
 */
const setVariable = async (config) => {
  Object.entries(config.variable).forEach(([property, value]) => {
    document.body.style.setProperty(property, value)
  })
  Plugin.PrimaryColor && document.body.style.setProperty('--primary-color', Plugin.PrimaryColor)
  Plugin.SecondaryColor && document.body.style.setProperty('--secondary-color', Plugin.SecondaryColor)
}

/**
 * 设置背景
 */
const setBackground = async (config) => {
  if (Plugin.BgImagePath) {
    const isFromNetwork = Plugin.BgImagePath.startsWith('http') || Plugin.BgImagePath.startsWith('//')
    if (isFromNetwork) {
      document.body.style.backgroundImage = `url(${Plugin.BgImagePath})`
      document.body.style.backgroundSize = '100% 100%'
      return
    }

    const base64 = await Plugins.ignoredError(Plugins.Readfile, Plugin.BgImagePath, { Mode: 'Binary' })
    if (!base64) {
      console.log(`[${Plugin.name}]`, '读取背景图片失败，跳过。')
      return
    }

    const suffix = Plugin.BgImagePath.split('.').pop() || 'jpg'
    document.body.style.backgroundImage = `url(data:image/${suffix};base64,${base64})`
    return
  }

  const [color, gradientImage] = BackgroundList[config.backgroundIndex]
  document.body.style.backgroundColor = color
  document.body.style.backgroundImage = gradientImage
}
