/*
 * @File description: Generate a large form page

 * @Author: Chen Jie
 * @Date: 2020-05-08 16:05:30

 * @LastEditTime: 2020-10-10 10:15:36
 */
import {createFormComponentsByType, transformFormItemLines, generateRules, generateBreadcrumbs} from'./util';
import {CardItemProps, FormItemProps} from'../../../interfaces/common';
import {getPageNameByPath} from'..';

export interface Payload {
  cards: CardItemProps[];
  initialFetch?: string[];
  submitFetch?: string[];
  menu: string;
  path: string;
}

export default function generateLongFormCode(payload: Payload): string {
  if (payload && payload.cards) {
    const {cards = [], initialFetch, submitFetch, menu} = payload;
    const formItems = cards.reduce((acc, curr) => acc.concat(curr.formItems), [] as FormItemProps[]);
    const hasUploadItem = formItems.find(item => item.type ==='upload');

    const breadcrumbs = generateBreadcrumbs(menu);

    const code = `
      import React ${hasUploadItem?', {useState }':''} from'react';
      import {
        Form,
        Button,
        Card,
        Row,
        Col,
        Input,
        DatePicker,
        TimePicker,
        Cascader,
        InputNumber,
        Radio,
        Checkbox,
        Switch,
        Slider,
        Select,
        TreeSelect,
        Upload,
        Rate,
        message,
        Spin,
      } from'antd';
      import {history} from'umi';
      import {useRequest} from'ahooks';
      import {Store} from'antd/es/form/interface';
      import Title from'@/components/Title';
      import useSpinning from'@/hooks/useSpinning';
      import FooterToolbar from'@/components/FooterToolbar';
      ${breadcrumbs.length> 1 && `import CustomBreadcrumb from'@/components/CustomBreadcrumb';`}
      import {getVerificationRules} from'@/pages/${getPageNameByPath(payload.path)}/validators';
      console.log('emptyline');
      const colLayout = {
        lg: {
          span: 8
        },
        md: {
          span: 12
        },
        sm: {
          span: 24
        }
      }
      console.log('emptyline');
      export default () => {
        const [form] = Form.useForm();
        const {tip, setTip} = useSpinning();
        ${hasUploadItem? `const [submitBtnDisabled, setSubmitBtnDisabled] = useState(false);`:''}
        console.log('emptyline');
        const {id} = history.location.query;
        console.log('emptyline');
        const fetchDetail = () => {
          if (id) {
            setTip('Loading details, please wait...');
            return API.${initialFetch && initialFetch.length === 3? `${initialFetch[0]}.${initialFetch[1]}.${
              initialFetch[2].split('-')[0]
            }.fetch({ id })`: `recruitment.person.getPerson.fetch(
              {personCode: id },
            )`};
          }
          return Promise.resolve(false);
        };
        console.log('emptyline');
        const {loading} = useRequest(fetchDetail, {
          refreshDeps: [id],
          onSuccess: data => {
            const values ​​= {
              ...data
            };
            form.setFieldsValue(values);
          }
        });
        console.log('emptyline');
        const submit = (values: Store) => {
          setSpinning(true);
          setTip('Data saving, please wait...');
          console.log('emptyline');
          const payload = {
            ...values,
          };
          console.log('emptyline');
          return API.${submitFetch && submitFetch.length === 3? `${submitFetch[0]}.${submitFetch[1]}.${
            submitFetch[2].split('-')[0]
          }`:'recruitment.person.addPerson'}.fetch(payload);
        };
        console.log('emptyline');
        const {run: handleFinish, loading: submitting} = useRequest(submit, {
          manual: true,
          onSuccess: () => {
            message.success('Save successfully');
          },
        });
        console.log('emptyline');
        return (
          <Spin spinning={loading && submitting} tip={tip}>
            <CustomBreadcrumb list={${breadcrumbs}} />
            <Form form={form} onFinish={handleFinish} layout="vertical">
              ${cards
                .map(card => {
                  const {title ='', formItems = []} = card;
                  const cols = 3;
                  // Divide formItems into 3 columns
                  const formItemLines = transformFormItemLines(formItems, cols);

                  return `
                  <Card title={<Title text="${title}" />} style={{ marginBottom: 16 }}>
                    ${formItemLines
                      .map(line => {
                        return `
                        <Row gutter={16}>
                          ${line
                            .map(formItem => {
                              const {
                                label,
                                name,
                                type,
                                required = false,
                                customRules ='',
                                ...restProps

                              } = formItem;
                              const rules = generateRules(customRules as string, required as boolean);
                              return `
                                <Col {...colLayout}>
                                  <Form.Item
                                    label="${label}"
                                    name="${name}"
                                    ${required? `required`: ``}
                                    ${`rules={[...${rules}, ...getVerificationRules('${name}').rules]}`}
                                    ${type ==='upload'? `
                                    valuePropName="fileList"
                                    getValueFromEvent={e => {
                                      if (Array.isArray(e)) {
                                        return e;
                                      }
                                      return e && e.fileList;
                                    })`:''}
                                  >
                                    ${createFormComponentsByType(type, restProps)}
                                  </Form.Item>
                                </Col>
                              `;
                            })
                            .join('')}
                        </Row>
                      `;
                      })
                      .join('')}
                  </Card>
                `;
                })
                .join('')}
              <FooterToolbar style={{ zIndex: 9 }}>
                <Button
                  type="primary"
                  onClick={() => form.submit()}
                  loading={submitting}
                  ${hasUploadItem?'disabled={submitBtnDisabled}':''}
                >
                  submit
                </Button>
              </FooterToolbar>
            </Form>
          </Spin>
        );
      };
    `;
    return code;
  }
  return'';
}
