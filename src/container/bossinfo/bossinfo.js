import React from 'react'
import {NavBar, InputItem, TextareaItem} from 'antd-mobile';
import AvatarSelector from '../../components/avatar-selector/avatar-selector'

class BossInfo extends React.Component {
    constructor(props) {
        super(props)
    }

    onChange(key, val) {

    }

    render() {
        return (
            <div>
                <NavBar mode="dark">完善BOSS信息</NavBar>
                <AvatarSelector></AvatarSelector>
                <InputItem onChange={(v) => this.onChange('title', v)}>
                    招聘职位
                </InputItem>
                <InputItem onChange={(v) => this.onChange('company', v)}>
                    公司名称
                </InputItem>
                <InputItem onChange={(v) => this.onChange('salary', v)}>
                    职位薪资
                </InputItem>
                <TextareaItem onChange={(v) => this.onChange('desc', v)}
                              row={3} autoHeight title='职位要求'>
                </TextareaItem>
            </div>
        )
    }
}

export default BossInfo