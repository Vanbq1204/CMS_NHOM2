package CMS;


/**
 * Generated from IDL interface "EmailMarketingService".
 *
 * @author JacORB IDL compiler V 3.9
 * @version generated at Apr 4, 2025, 3:18:30 AM
 */

public abstract class EmailMarketingServicePOA
	extends org.omg.PortableServer.Servant
	implements org.omg.CORBA.portable.InvokeHandler, CMS.EmailMarketingServiceOperations
{
	static private final java.util.HashMap<String,Integer> m_opsHash = new java.util.HashMap<String,Integer>();
	static
	{
		m_opsHash.put ( "getCustomerSegment", Integer.valueOf(0));
		m_opsHash.put ( "sendCampaign", Integer.valueOf(1));
		m_opsHash.put ( "getCampaign", Integer.valueOf(2));
		m_opsHash.put ( "createCampaign", Integer.valueOf(3));
	}
	private String[] ids = {"IDL:CMS/EmailMarketingService:1.0"};
	public CMS.EmailMarketingService _this()
	{
		org.omg.CORBA.Object __o = _this_object() ;
		CMS.EmailMarketingService __r = CMS.EmailMarketingServiceHelper.narrow(__o);
		return __r;
	}
	public CMS.EmailMarketingService _this(org.omg.CORBA.ORB orb)
	{
		org.omg.CORBA.Object __o = _this_object(orb) ;
		CMS.EmailMarketingService __r = CMS.EmailMarketingServiceHelper.narrow(__o);
		return __r;
	}
	public org.omg.CORBA.portable.OutputStream _invoke(String method, org.omg.CORBA.portable.InputStream _input, org.omg.CORBA.portable.ResponseHandler handler)
		throws org.omg.CORBA.SystemException
	{
		org.omg.CORBA.portable.OutputStream _out = null;
		// do something
		// quick lookup of operation
		java.lang.Integer opsIndex = (java.lang.Integer)m_opsHash.get ( method );
		if ( null == opsIndex )
			throw new org.omg.CORBA.BAD_OPERATION(method + " not found");
		switch ( opsIndex.intValue() )
		{
			case 0: // getCustomerSegment
			{
				java.lang.String _arg0=_input.read_string();
				_out = handler.createReply();
				CMS.StringSeqHelper.write(_out,getCustomerSegment(_arg0));
				break;
			}
			case 1: // sendCampaign
			{
				java.lang.String _arg0=_input.read_string();
				_out = handler.createReply();
				_out.write_boolean(sendCampaign(_arg0));
				break;
			}
			case 2: // getCampaign
			{
				java.lang.String _arg0=_input.read_string();
				_out = handler.createReply();
				CMS.EmailCampaignHelper.write(_out,getCampaign(_arg0));
				break;
			}
			case 3: // createCampaign
			{
				CMS.EmailCampaign _arg0=CMS.EmailCampaignHelper.read(_input);
				_out = handler.createReply();
				_out.write_boolean(createCampaign(_arg0));
				break;
			}
		}
		return _out;
	}

	public String[] _all_interfaces(org.omg.PortableServer.POA poa, byte[] obj_id)
	{
		return ids;
	}
}
