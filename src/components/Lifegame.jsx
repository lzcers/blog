import React, { useState, useEffect } from 'react'

export default () => {
    const [canvasSize, setCanvasSize] = useState()
    useEffect(() => {
        const myCanvas = document.getElementById('lifegame')
        const canvasSize = Math.round(myCanvas.offsetWidth / 10) * 10 // 减去 padding 占用的空间

        const c = myCanvas.getContext('2d')
        const matrixSize = canvasSize / 10
        const cellSize = 10
        //  初始化画布
        c.fillStyle = '#eeeeee' // 灰色背景色
        // c.fillRect(0, 0, canvasSize, canvasSize)

        // 初始化矩阵
        const cellMatrix = initCellMatrix(matrixSize)

        // 绑定鼠标事件
        const mousePassFn = myCanvas.addEventListener('mousemove', mousePassCanvas)

        setCanvasSize(canvasSize)

        // 主循环
        function Main(cellMatrix) {
            const tempM = deepcopy(cellMatrix)
            liveStatusUpdate(tempM)
            mapMatrix(cellMatrix)
        }

        // 矩阵状态映射至canvas网格
        // 初始化细胞矩阵
        function initCellMatrix(size) {
            const array = new Array(size)
            for (let i = 0; i < size; i++) {
                array[i] = new Array(size)
                for (let j = 0; j < size; j++) array[i][j] = Math.round(Math.random()) // array[i][j] = 0 // 默认细胞死亡
            }
            return array
        }
        // 细胞周围生存情况
        function surroundCell(_x, _y, cellmatrix) {
            // 映射至细胞矩阵数组坐标
            let liveNumber = 0
            for (let i = _x - 1; i <= _x + 1; i++)
                for (let j = _y - 1; j <= _y + 1; j++)
                    if (i >= 0 && i < cellmatrix.length && (j >= 0 && j < cellmatrix.length) && !(i === _x && j === _y))
                        liveNumber += cellmatrix[i][j] === 1 ? 1 : 0
            return liveNumber
        }

        function liveRule(x, y, matrix) {
            // 规则1.如果一个细胞周围有三个细胞为生，则该细胞为生
            // 规则2.如果一个细胞周围有2个细胞为生，
            // 规则3.在其它情况下，该细胞为死（即该细胞若原先为生，则转为死，若原先为死，则保持不变）
            const surroundLiveNumber = surroundCell(x, y, matrix)
            switch (surroundLiveNumber) {
                case 3:
                    cellMatrix[x][y] = 1
                    return 1
                case 2:
                    return -1
                default:
                    cellMatrix[x][y] = 0
                    return 0
            }
        }
        // _x, _y 为细胞矩阵中的坐标，映射至canvas
        function liveCell(_x, _y) {
            c.fillStyle = '#000000'
            c.fillRect(_x * cellSize, _y * cellSize, cellSize, cellSize)
        }
        // 杀死细胞
        function killCell(_x, _y) {
            //        c.fillStyle='#eeeeee'; // 采用背景色填充
            c.fillStyle = '#ffffff'
            c.fillRect(_x * cellSize, _y * cellSize, cellSize, cellSize)
        }
        function mapMatrix(matrix) {
            const length = matrix.length
            for (let x = 0; x < length; x++)
                for (let y = 0; y < length; y++) matrix[x][y] === 1 ? liveCell(x, y) : killCell(x, y)
        }
        function mousePassCanvas(event) {
            const X = event.offsetX
            const Y = event.offsetY
            const offsetMatrixX = Math.floor(X / cellSize)
            const offsetMatrixY = Math.floor(Y / cellSize)
            if (offsetMatrixX <= 0 || offsetMatrixY <= 0) return
            if (offsetMatrixX < matrixSize && offsetMatrixY < matrixSize) cellMatrix[offsetMatrixX][offsetMatrixY] = 1
            mapMatrix(cellMatrix)
        }

        function deepcopy(obj) {
            const out = []
            const length = obj.length
            for (let i = 0; i < length; i++)
                if (obj[i] instanceof Array) out[i] = deepcopy(obj[i])
                else out[i] = obj[i]
            return out
        }
        // 细胞状态更新
        function liveStatusUpdate(matrix) {
            const length = matrix.length
            for (let i = 0; i < length; i++) for (let j = 0; j < length; j++) liveRule(i, j, matrix)
        }

        // 开始主循环
        let start = null
        const step = timestamp => {
            if (!start) start = timestamp
            const progress = timestamp - start
            if (progress > 60) {
                start = timestamp
                Main(cellMatrix)
            }
            window.requestAnimationFrame(step)
        }
        requestAnimationFrame(step)

        return () => myCanvas.removeEventListener('mousemove', mousePassFn)
    })

    function sizePX(canvasSize = 300) {
        if (canvasSize !== 0)
            return {
                height: canvasSize + 'px',
                width: canvasSize + 'px',
                margin: '0 auto'
            }
    }
    return (
        <div className="lifegame-box" style={sizePX(canvasSize)}>
            <canvas id="lifegame" width={canvasSize} height={canvasSize} />
        </div>
    )
}
