import React from 'react'

export default class Lifegame extends React.PureComponent {
    state = {
        canvasSize: 0,
        intervalCode: null,
        myCanvas: null
    }
    constructor(props) {
        super(props)
        this.state.canvasSize = props.size
    }
    render() {
        const state = this.state
        return (
            <div className="lifegame-box" style={this.sizePX()}>
                <canvas id="lifegame" 
                    width={state.canvasSize} 
                    height={state.canvasSize}
                />
            </div>           
        )
    }
    sizePX() {
        if (this.state.canvasSize != 0)
        return { 
            height: this.state.canvasSize +'px',
            width: this.state.canvasSize +'px',
            margin: '0 auto'
        }
    }
    componentDidMount() {
        let myCanvas = document.getElementById("lifegame")
        this.state.myCanvas = myCanvas
        const canvasSize = Math.round(myCanvas.offsetWidth / 10) * 10 // 减去 padding 占用的空间
        this.state.canvasSize = canvasSize
        const matrixSize = canvasSize / 10
        const cellSize = 10
        if (myCanvas == null) return
        myCanvas.addEventListener("mousemove", mousePassCanvas)
        let c = myCanvas.getContext("2d")
        // 初始化细胞矩阵
        let cellMatrix = initCellMatrix(matrixSize)
        //  初始化画布
        //    c.fillStyle='#eeeeee' // 灰色背景色
        c.fillRect(0, 0, canvasSize, canvasSize)
        this.state.intervalCode = setInterval(Main, 50)
        function Main() {
          let tempM = deepcopy(cellMatrix)
          liveStatusUpdate(tempM)
          mapMatrix(cellMatrix)
        }
        // 初始化细胞矩阵
        function initCellMatrix(size) {
          let array = new Array(size)
          for (let i = 0; i < size; i++) {
            array[i] = new Array(size)
            for (let j = 0; j < size; j++) {
              //array[i][j] = 0 // 默认细胞死亡
              array[i][j] = Math.round(Math.random())
            }
          }
          return array
        }
        function deepcopy(obj) {
          let out = [],
            length = obj.length
          for (let i = 0; i < length; i++) {
            if (obj[i] instanceof Array) {
              out[i] = deepcopy(obj[i])
            } else out[i] = obj[i]
          }
          return out
        }
        // 绘制网格
        function drawGrid(interval, size) {
          for (let i = 0; i <= size; i += interval) {
            // 画行
            c.moveTo(0, i)
            c.lineTo(size, i)
            c.stroke()
            // 画列
            c.moveTo(i, 0)
            c.lineTo(i, size)
            c.stroke()
          }
        }
        // 细胞状态更新
        function liveStatusUpdate(matrix) {
          let length = matrix.length
          for (let i = 0; i < length; i++) {
            for (let j = 0; j < length; j++) {
              liveRule(i, j, matrix)
            }
          }
        }
        function liveRule(_x, _y, matrix) {
          // 规则1.如果一个细胞周围有三个细胞为生，则该细胞为生
          // 规则2.如果一个细胞周围有2个细胞为生，
          // 规则3.在其它情况下，该细胞为死（即该细胞若原先为生，则转为死，若原先为死，则保持不变）
          let surroundLiveNumber = surroundCell(_x, _y, matrix)
          switch (surroundLiveNumber) {
            case 3:
              cellMatrix[_x][_y] = 1
              return 1
            case 2:
              return -1
            default:
              cellMatrix[_x][_y] = 0
              return 0
          }
        }
        // 细胞周围生存情况
        function surroundCell(_x, _y, cellMatrix) {
          // 映射至细胞矩阵数组坐标
          let liveNumber = 0
          for (let i = _x - 1; i <= _x + 1; i++) {
            for (let j = _y - 1; j <= _y + 1; j++) {
              if (
                i >= 0 &&
                i < cellMatrix.length &&
                (j >= 0 && j < cellMatrix.length) &&
                !(i == _x && j == _y)
              ) {
                liveNumber += cellMatrix[i][j] == 1 ? 1 : 0
              }
            }
          }
          return liveNumber
        }
        // 绘制细胞
        // _x, _y 为细胞矩阵中的坐标，映射至canvas
        function liveCell(_x, _y) {
          c.fillStyle = "#000000"
          c.fillRect(_x * cellSize, _y * cellSize, cellSize, cellSize)
        }
        // 杀死细胞
        function killCell(_x, _y) {
          //        c.fillStyle='#eeeeee' // 采用背景色填充
          c.fillStyle = "#ffffff"
          c.fillRect(_x * cellSize, _y * cellSize, cellSize, cellSize)
        }
        // 矩阵状态映射至canvas网格
        function mapMatrix(matrix) {
          let length = matrix.length
          for (let x = 0; x < length; x++) {
            for (let y = 0; y < length; y++) {
              matrix[x][y] == 1 ? liveCell(x, y) : killCell(x, y)
            }
          }
        }
        function mousePassCanvas(event) {
          let X = event.offsetX
          let Y = event.offsetY
    
          let offsetMatrixX = Math.floor(X / cellSize)
          let offsetMatrixY = Math.floor(Y / cellSize)
          if (offsetMatrixX <= 0 || offsetMatrixY <= 0) return
          if (offsetMatrixX < matrixSize && offsetMatrixY < matrixSize)
          cellMatrix[offsetMatrixX][offsetMatrixY] = 1
          mapMatrix(cellMatrix)
        }
        this.mousePassCanvas = mousePassCanvas
    }
    componentWillUnmount() {
        this.state.myCanvas.removeEventListener("mousemove", this.mousePassCanvas)
        clearInterval(this.state.intervalCode)
    }
}